define( [ 'graphOption' ], function( GraphOptionList ){

    var root = 'https://stats.expensify.com/render/?';
    var TARGET = 'target=cumulative(sumSeries(stats.counters.*.web.api.command.SignUp.count))';


    function _getParam( input ){
        var option = {
            targets: []
        };

        input = input.substr( input.indexOf( '?' ) + 1 );
        input = input.split( '&' );

        for( var tuple in input ){
            var row = input[tuple].split( '=' );
            if( row[0] === 'target' )
                option.targets.push( row[1] );
            else
                option[row[0]] = row[1];
        }
        return option;
    }


    function _seriesTokenizer( seriesStr ){
        var token = [];
        var fct = {name: '',arg:''};

        var start = 0;
        var end = seriesStr.length-2;

        var go =0;
        while( go < 100000 ){
            go++;

            if( seriesStr.charAt(start) !== '(' ){
                fct.name += seriesStr.charAt(start);
                start++;
                continue;
            }
            else if( seriesStr.charAt(end) == '(' || seriesStr.charAt(end) == ')' ){
                fct.arg = fct.arg.split( ',' );
                if( typeof fct.arg[0] == 'string' && fct.arg[0].length == 0 ){
                    fct.arg = fct.arg.slice( 1 );
                }
                token.push( fct );
                fct = {name:'', arg:''};

                if( seriesStr.charAt(end) == '(' ){
                    break;
                }
                end--;
                start++;
            }
            else if( seriesStr.charAt(end) != ')' ){
                fct.arg = seriesStr.charAt(end) + fct.arg;
                end --;
                continue;
            }
            if( seriesStr.charAt(start) == ')' || seriesStr.charAt(end) == '(' ){
                break;
            }
        }
        token.reverse();
        return token;
    }

    return {
        setRoot: function( url ){
            root = url.substr( 0, url.indexOf( '?' ) + 1 );
        },
        getChartUrl: function( chartOption, series ){
            var url = root;
            for( var key in chartOption ){
                if( chartOption[key] == GraphOptionList[key].def ){
                    continue;
                }

                if( chartOption[key].length != 0 )
                    url += '&' + key + '=' + chartOption[key];
            }
            series.forEach( function( serie ){
                url += '&target=';
                var fctStr = serie.name;
                if( serie.functions.length === 0 ){
                    url += serie.name;
                    return;
                }

                serie.functions.forEach( function( fct ){
                    fctStr = fct.name + '(' + fctStr;
                    fct.arg.forEach( function( args, index ){
                        fctStr += ',' + args;
                    });
                    fctStr += ')';
                });
                url += fctStr;
            });

            return url;
        },
        extractChartOption: function( input ){
            var option = _getParam( input );
            delete option.targets;

            return option;
        },
        extractSeries: function( input ){
            var options = _getParam( input );

            var series = [];
            options.targets.forEach(function( target ){
                var token = _seriesTokenizer( target );
                var serieName = token[0].arg[0];
                token[0].arg = token[0].arg.slice( 1 );
                series.push({
                    name: serieName,
                    functions: token
                });
            });
            return series;
        },
    }
});
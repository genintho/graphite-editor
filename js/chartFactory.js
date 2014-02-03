var ChartFactory = {
    buildFromURL: function( url, versionFunction ){
        var url = this._sanitizeURL( url );
        var chart = new Chart();
        chart.setRoot( url.substr( 0, url.indexOf( '?' ) + 1 ) );
        chart.setOptions( this._extractOptionsFromURL( url ) );
        chart.setSeries( this._extractSeriesFromURL( url, versionFunction ) );
        return chart;
    },

    _extractOptionsFromURL: function( url ){
        var option = this._getParam( url );
        delete option.targets;

        return option;
    },

    _extractSeriesFromURL: function( url, versionFunction ){
        var options = this._getParam( url );
        var startReg = /^"/;
        var endReg = /"$/;
        var _chart = this;
        var series = [];
        options.targets.forEach(function( target ){
            var token = _chart._seriesTokenizer( target );
            var serieName = token[0].arg[0];
            var serie = new Serie( serieName );
            token[0].arg = token[0].arg.slice( 1 );
            token.forEach(function( fct ){
                var args = [];
                fct.arg.forEach(function( urlArg, index ){
                    var config = versionFunction[fct.name].arg;
                    if( config[index].type === "string" || config[index].type === "color" ){
                        urlArg = urlArg.replace( startReg, "" );
                        urlArg = urlArg.replace( endReg, "" );
                    }
                    args.push( urlArg );
                });
                serie.addFunction( new SerieFunction( fct.name, args ) );
            });
            series.push( serie );
        });
        return series;
    },

    _seriesTokenizer: function( seriesStr ){
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
    },

    _getParam: function( input ){
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
    },
    _sanitizeURL: function( url ){
        url.trim();
        url = decodeURIComponent( url );
        return url;
    },

    buildfromFormValue: function( formChartOptions, formSeriesOptions ){
        var chart = new Chart();
        chart.setOptions( formChartOptions );
        var series = [];
        formSeriesOptions.forEach(function( formSerie ){
            var serie = new Serie( formSerie.name );
            formSerie.functions.forEach(function( formFunction ){
                serie.addFunction( new SerieFunction( formFunction.name, formFunction.arg ) );
            });
            series.push( serie );
        });
        chart.setSeries( series );
        window.c = chart;
        return chart;
    }

};

var UI = UI || {};

UI.Series = (function(){

    function _buildSerieContainer( serie ){
        var div = document.createElement( 'div' );
        div.className = 'serie_container';

        var h3 = document.createElement( 'h3' );
        h3.appendChild( document.createTextNode( serie.name ) );
        div.appendChild( h3 );

        return div;
    }

    function _buildFunctionBlock( index, fct ){
        var div = document.createElement( 'div' );
        div.className = 'function';

        var h4 = document.createElement( 'h4' );
        h4.appendChild( document.createTextNode( index + ' - ' + fct.name ) );
        div.appendChild( h4 );

        var form = document.createElement( 'form' );
        form.id = "";
        form.className = "form-horizontal";
        form.setAttribute( 'role', 'form' );


        var option = FunctionList[fct.name];
        if( typeof option.arg !== 'object' ){
            return div;
        }
        option.arg.forEach(function( arg, index ){
            var group = null;
            switch( arg.type ){
                case 'float':
                case 'string':
                    group = UIUtils.buildStringInput( fct.name, arg.name, '', 3, 9, arg, fct.arg[index] );
                    break;

                case 'color':
                    group = UIUtils.buildColorInput( fct.name, arg.name, '', 3, 9, arg, fct.arg[index] );
                    break;

                case 'bool':
                    group = UIUtils.buildCheckboxInput( fct.name, arg.name, '', 3, 9, arg, fct.arg[index] );
                    break;

                case 'number':
                    group = UIUtils.buildNumberInput( fct.name, arg.name, '', 3, 9, arg, fct.arg[index] );
                    break;

                case 'select':
                    group = UIUtils.buildSelectInput( fct.name, arg.name, '', 3, 9 ,arg, fct.arg[index] );
                    break;

                default :
                    console.info( 'miss type ', option.type, option );
                    break;

            }
            form.appendChild( group );
        });

        div.appendChild( form );

        return div;
    }

    return {
        getValue: function(){
            var series = [];
            var seriesContainer = document.getElementById( 'series_container' ).getElementsByClassName( 'serie_container' );
            for( var j = 0, lenj = seriesContainer.length; j<lenj ; j++ ){
                var form1 = seriesContainer[j];
                var serie = {name:"", functions:[]};
                var h3 = form1.getElementsByTagName( 'h3' )[0];
                serie.name = h3.innerText;
                var functions = form1.getElementsByClassName( 'function' );
                for( var i = 0, len = functions.length; i< len; i++ ){
                    var group = functions[i];
                    var functionName = group.getElementsByTagName( 'h4' )[0].innerText.split( '-' )[1];
                    var res = {
                        name: functionName.trim(),
                        arg:[]
                    };

                    var form = group.getElementsByTagName( 'form' );
                    if( form.length ){
                        form = form[0];
                        for( var k = 0, lenk = form.elements.length; k < lenk; k++ ){
                            var element = form.elements[k];
                            var value = element.value;
                            if( element.type == 'checkbox' ){
                                value = element.checked ? 'true': 'false';
                            }
                            else if( element.type == 'color' ){
                                value = element.value.substr( 1 );
                            }
                            res.arg.push( value );
                        }
                    }

                    serie.functions.push( res );
                }
                series.push( serie );
            }
            return series;
        },

        refresh: function( series ){
            var eTarget = document.getElementById( "series_container" );
            series.forEach(function( serie ){
                var container = _buildSerieContainer( serie );

                serie.functions.forEach(function( fct, index ){
                    container.appendChild( _buildFunctionBlock( index+1, fct ) );
                });

                eTarget.appendChild( container );
            });

        }
    }
});

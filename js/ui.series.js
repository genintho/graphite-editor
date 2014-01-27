var UI = UI || {};

UI.Series = (function(){
    var _versionOptions = null;
    var _seriesContainer = null;

    function _buildSerieContainer( serie ){
        var div = document.createElement( 'div' );
        div.className = 'serie_container';

        var h3 = document.createElement( 'h3' );
        h3.appendChild( document.createTextNode( serie.getPrettyName() ) );
        div.appendChild( h3 );

        return div;
    }

    function _buildFunctionBlock( index, fct ){
        var div = document.createElement( 'div' );
        div.className = 'function';

        var h4 = document.createElement( 'h4' );
        h4.appendChild( document.createTextNode( index + ' - ' + fct.getName() ) );
        div.appendChild( h4 );

        var form = document.createElement( 'form' );
        form.id = "";
        form.setAttribute( 'role', 'form' );


        var option = _versionOptions[fct.getName()];
        if( typeof option.arg !== 'object' ){
            return div;
        }

        var table = document.createElement( 'table' );
        var head = table.createTHead();
        var row = head.insertRow( -1 );
        var th = document.createElement( 'th' );
        th.appendChild( document.createTextNode( 'Name') );
        row.appendChild( th );
        th = document.createElement( 'th' );
        th.appendChild( document.createTextNode( 'Value') );
        row.appendChild( th );

        option.arg.forEach(function( arg, index ){
            row = table.insertRow( -1 );
            switch( arg.type ){
                case 'float':
                case 'string':
                    UI.Utils.buildStringInput( row, arg.name, '', arg, fct.getArgumentAtIndex(index) );
                    break;

                case 'color':
                    UI.Utils.buildColorInput( row, arg.name, '', arg, fct.getArgumentAtIndex(index) );
                    break;

                case 'bool':
                    UI.Utils.buildCheckboxInput( row, arg.name, '', arg, fct.getArgumentAtIndex(index) );
                    break;

                case 'number':
                    UI.Utils.buildNumberInput( row, arg.name, '', arg, fct.getArgumentAtIndex(index) );
                    break;

                case 'select':
                    UI.Utils.buildSelectInput( row, arg.name, '', arg, fct.getArgumentAtIndex(index) );
                    break;

                default :
                    console.info( 'miss type ', option.type, option );
                    break;
            }
        });

        form.appendChild( table );
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
            var tree = document.createDocumentFragment();

            series.forEach(function( serie ){
                var container = _buildSerieContainer( serie );

                serie.getFunctions().forEach(function( fct, index ){
                    container.appendChild( _buildFunctionBlock( index+1, fct ) );
                });

                tree.appendChild( container );
            });

            _seriesContainer.appendChild( tree );
        },

        init: function( versionOptions ){
            _versionOptions = versionOptions;
            _seriesContainer = document.getElementById( "series_container" );
        }
    }
})();

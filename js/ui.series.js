var UI = UI || {};

UI.Series = (function(){
    var _versionOptions = null;
    var _seriesContainer = null;
    var _draggedElement = null;

    /**
     *
     * @param {Serie} serie
     * @returns {HTMLElement}
     * @private
     */
    function _buildSerieContainer( serie ){
        var div = document.createElement( "div" );
        div.classList.add( "serie_container" );
        div.id = "serie_" + serie.getID();

        return div;
    }

    function _buildHeader( div, serie ){
        var h3 = document.createElement( "h3" );
        h3.appendChild( document.createTextNode( serie.getPrettyName() ) );
        div.appendChild( h3 );

        var button = document.createElement( "button" );
        button.type = "button";
        button.appendChild( document.createTextNode( 'Delete Serie' ) );
        button.classList.add( "remove" );
        button.dataset.serieid = serie.getID();
        div.appendChild( button );
        div.appendChild( _buildFunctionSelector( serie ) );

        return div;
    }

    function _buildFunctionBlock( index, fct ){
        var option = _versionOptions[fct.getName()];

        var div = document.createElement( 'div' );
        div.classList.add( 'function' );
        div.setAttribute( 'draggable', true );

        var h4 = document.createElement( 'h4' );
        h4.appendChild( document.createTextNode( index + ' - ' + fct.getName() ) );
        div.appendChild( h4 );

        var form = document.createElement( 'form' );
        form.id = "";
        form.setAttribute( 'role', 'form' );

        if( option === undefined ){
            div.appendChild( document.createTextNode( 'Unknown function in this version' ) );
            return div;
        }

        if( typeof option.arg !== 'object' ){
            return div;
        }

        var table = document.createElement( 'table' );
        var head = table.createTHead();
        var row = head.insertRow( -1 );
//        var th = document.createElement( 'th' );
//        th.appendChild( document.createTextNode( 'Name') );
//        row.appendChild( th );
//        th = document.createElement( 'th' );
//        th.appendChild( document.createTextNode( 'Value') );
//        row.appendChild( th );

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

    function _buildFunctionSelector( serie ){
        var select = document.createElement( "select" );
        select.classList.add( "add_function" );

        var option = document.createElement( 'option' );
        option.selected = true;
        option.disabled = true;
        option.text = "Apply function ...";

        select.add( option );
        var usedFunction = serie.getFunctionList();
        for( var key in _versionOptions ){
            if( usedFunction.indexOf( key ) !== -1 ){
                continue;
            }
            option = document.createElement( "option" );
            option.text = key;
            option.value = key;
            select.appendChild( option );
        }

        return select;
    }

    function addFunction( event ){
        var fctName = this.value;

        PubSub.publish( EVENT.SERIE.ADD_FUNCTION, {
            serieID: this.parentNode.id.substr( 6 ),
            functionName: fctName
        });
    }

    function _bindEvents(){
        var binding = {
            dragstart: handleDragStart,
            dragenter: handleDragEnter,
            dragover: handleDragOver,
            dragleave: handleDragLeave,
            drop: handleDrop,
            dragend: handleDragEnd
        };
        for( var event in binding ){
            UI.Utils.bind( _seriesContainer, event, "function", binding[event] );
        }
        UI.Utils.bind( _seriesContainer, "click", "remove", deleteSerie );
        UI.Utils.bind( _seriesContainer, "change", "add_function", addFunction );
    }

    function deleteSerie( event ){
        PubSub.publish( EVENT.SERIE.REMOVE, {
            serieID: this.dataset.serieid
        });
    }

    function handleDragStart(e) {
        _draggedElement = this;
        _draggedElement.style.opacity = '0.4';  // this / e.target is the source node.
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }

        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

        return false;
    }

    function handleDragEnter(e) {
        // this / e.target is the current hover target.
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');  // this / e.target is previous target element.
    }

    function handleDrop(e) {
        // this / e.target is current target element.
        if( e.stopPropagation ){
            e.stopPropagation(); // stops the browser from redirecting.
        }
        _draggedElement.style.opacity = '1';
        // Don't do anything if dropping the same column we're dragging.
        if( _draggedElement != this && _draggedElement.parentNode == this.parentNode ){
            // Set the source column's HTML to the HTML of the column we dropped on.
            _draggedElement.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
        }

        return false;
    }

    function handleDragEnd(e) {
        // this/e.target is the source node.
        var blocks = document.querySelectorAll('#series_container .function');
        [].forEach.call(blocks, function (block) {
            block.classList.remove('over');
        });
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

                container = _buildHeader( container, serie );

                serie.getFunctions().forEach(function( fct, index ){
                    container.appendChild( _buildFunctionBlock( index+1, fct ) );
                });

                tree.appendChild( container );
            });
            _seriesContainer.innerHTML = '';
            _seriesContainer.appendChild( tree );
        },

        refreshOne: function( serie ){
            var container = document.getElementById( "serie_" + serie.getID() );
            container.innerHTML = '';
            container = _buildHeader( container, serie );

            serie.getFunctions().forEach(function( fct, index ){
                container.appendChild( _buildFunctionBlock( index+1, fct ) );
            });
        },

        init: function( versionOptions ){
            _versionOptions = versionOptions;
            _seriesContainer = document.getElementById( "series_container" );
            _bindEvents();
        }
    };
})();

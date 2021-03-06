var UI = UI || {};

UI.ChartOptions = (function(){

    var _versionOptions = null;
    var _chartOptionContainer = null;
    var _config = null;

    var _addOptionSelect = null;


    function _updateUI( config ){
        var table = document.createElement( 'table' );
        var head = table.createTHead();
        var row = head.insertRow( -1 );
        var th = document.createElement( 'th' );
        th.appendChild( document.createTextNode( 'Name') );
        row.appendChild( th );
        th = document.createElement( 'th' );
        th.appendChild( document.createTextNode( 'Value') );
        row.appendChild( th );
        th = document.createElement( 'th' );
        th.appendChild( document.createTextNode( 'Delete') );
        row.appendChild( th );

        for( var key in config ){
            var option = _versionOptions[key];

            // Skip unknown parameter
            if( option === undefined ){
                continue;
            }

            row = table.insertRow( -1 );


            switch( option.type ){

                case 'float':
                case 'string':
                    UI.Utils.buildStringInput( row, key, '', option, config[key] );
                    break;

                case 'color':
                    UI.Utils.buildColorInput( row, key, '', option, config[key] );
                    break;

                case 'bool':
                    UI.Utils.buildCheckboxInput( row, key, '', option, config[key] );
                    break;

                case 'number':
                    UI.Utils.buildNumberInput( row, key, '', option, config[key] );
                    break;

                case 'select':
                    UI.Utils.buildSelectInput( row, key, '', option, config[key] );
                    break;

                default :
                    console.info( 'miss type ', option.type, option );
                    break;

            }
            var cell = row.insertCell(-1);
            var del = document.createElement( "button" );
            del.type = "button";
            del.classList.add( 'js_remove' );
            del.setAttribute( 'data-key', key );
            del.appendChild( document.createTextNode( 'Remove' ) );
            cell.appendChild( del );
        }

        _chartOptionContainer.innerHTML = '';
        _chartOptionContainer.appendChild( table.cloneNode( true ) );
    }

    function _extraOption( config ){
        _addOptionSelect.innerHTML = null;

        var selectTree = document.createDocumentFragment();

        var option = document.createElement( 'option' );
        option.selected = true;
        option.disabled = true;
        option.text = "Add options" ;
        selectTree.appendChild( option );

        for( var key in _versionOptions ){
            if( config[key] !== undefined ){
                continue;
            }
            option = document.createElement( 'option' );
            option.text = key;
            option.value = key;
            selectTree.appendChild( option );
        }

        _addOptionSelect.appendChild( selectTree );
    }

    function _refresh( options ){
        _config = options;
        _updateUI( options );
        _extraOption( options );
    }

    function _bindEvents(){
        UI.Utils.bind( _chartOptionContainer, "click", "js_remove", function( event ){
            PubSub.publish( EVENT.OPTION.REMOVE, {
                key: event.target.dataset['key']
            });
        });

        _addOptionSelect.addEventListener( "change", function( event ){
            PubSub.publish( EVENT.OPTION.ADD, {
                key: event.target.value
            });
        });
    }


    return {
        refresh: _refresh,
        getValue: function(){
            var res  = {};
            for( var i = 0, len = _chartOptionContainer.elements.length; i< len; i+=2 ){
                var element = _chartOptionContainer.elements[i];
                var value = element.value;

                if( element.type == 'checkbox' ){
                    value = element.checked ? 'true': 'false';
                }
                else if( element.type == 'color' ){
                    value = element.value.substr( 1 );
                }

                if( _versionOptions[element.name].def && _versionOptions[element.name].def == value ){
                    continue;
                }

                res[element.name] = value;
            }
            return res;
        },
        init: function( versionOptions ){
            _versionOptions = versionOptions;
            _chartOptionContainer = document.getElementById( "chart_container" );
            _addOptionSelect = document.getElementById( 'addOption' );

           _bindEvents();
        }
    };
})();
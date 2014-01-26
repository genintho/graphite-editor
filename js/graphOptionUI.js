define( [ 'graphOption', 'uiutils' ], function( GraphOptionList, UIUtils ){

    var _chartOptionContainer = null;
    var _config = null;


    function _run( config ){
        var content = document.createDocumentFragment();
        for( var key in config ){
            var group = null;
            var option = GraphOptionList[key];

            switch( option.type ){

                case 'float':
                case 'string':
                    group = UIUtils.buildStringInput( key, key, '', 3, 8, option, config[key] );
                    break;

                case 'color':
                    group = UIUtils.buildColorInput( key, key, '', 3, 8, option, config[key] );
                    break;

                case 'bool':
                    group = UIUtils.buildCheckboxInput( key, key, '', 3, 8, option, config[key] );
                    break;

                case 'number':
                    group = UIUtils.buildNumberInput( key, key, '', 3, 8, option, config[key] );
                    break;

                case 'select':
                    group = UIUtils.buildSelectInput( key, key, '', 3, 8 ,option, config[key] );
                    break;

                default :
                    console.info( 'miss type ', option.type, option );
                    break;

            }
            var del = document.createElement( "button" );
            del.type = "button";
            del.className = "btn btn-danger col-md-1 remove";
            del.setAttribute( 'data-key', key );
            del.appendChild( document.createTextNode( 'Remove' ) );
            group.appendChild( del );

            content.appendChild( group );
        }

        _chartOptionContainer.innerHTML = '';
        _chartOptionContainer.appendChild( content.cloneNode( true ) );
    }


    function _extraOption( config ){
        var self = this;
        var $container = $( '#addOption_container' ).empty();

        for( var key in GraphOptionList ){
            if( config[key] !== undefined ){
                continue;
            }
            $container.append( '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="add">' + key + '</a></li>' );
        }

    }

    function _refresh( config ){
        _config = config;
        _run( config );
        _extraOption( config );
    }

    return {
        refresh: _refresh,
        getValue: function(){
            var res  = {};
            var form = document.getElementById( "chart_container" );
            for( var i = 0, len = form.elements.length; i< len; i+=2 ){
                var element = form.elements[i];
                var value = element.value;

                if( element.type == 'checkbox' ){
                    value = element.checked ? 'true': 'false';
                }
                else if( element.type == 'color' ){
                    value = element.value.substr( 1 );
                }

                if( GraphOptionList[element.name].def && GraphOptionList[element.name].def == value ){
                    continue;
                }

                res[element.name] = value;
            }
            return res;
        },
        init: function(){
            _chartOptionContainer = document.getElementById( "chart_container" );

            $( _chartOptionContainer )
                .on( 'click', '.remove', function( event ){
                    var key = $(this).data('key');
                    delete _config[key];
                    _refresh( _config );
                });
            $( "#addOption_container" ).on( 'click', '.add', function( event ){
                event.preventDefault();
                _config[ event.target.text ] = GraphOptionList[event.target.text].def ? GraphOptionList[event.target.text].def : '';
                _refresh( _config );
            });
        }
    };
});
var UI = UI || {};

UI.Utils = {
    _createLabel: function( row, text){
        var cell = row.insertCell( -1 );
        cell.appendChild( document.createTextNode( text ) );
    },

    _createInput: function( name, optionBlock, value ){
        var input = document.createElement( 'input' );

        input.setAttribute( 'name', name );
        input.setAttribute( 'class', 'form-control' );


        if( typeof value === 'string' && value.length ){
            input.setAttribute( 'value', value );
        }
        else if( optionBlock.def ){
            input.setAttribute( 'value', optionBlock.def );
        }

        return input;
    },

    buildStringInput: function( row, name, groupClass, optionBlock, value ){
        this._createLabel( row, name );

        var cell = row.insertCell( -1 );
        var input = this._createInput( name, optionBlock, value );
        input.setAttribute( 'type', 'text' );
        cell.appendChild( input );
    },

    buildColorInput: function( row, name, groupClass, optionBlock, value ){
        this._createLabel( row, name );

        var cell = row.insertCell( -1 );
        var input = this._createInput( name, optionBlock, value );
        input.setAttribute( 'type', 'color' );
        cell.appendChild( input );
    },

    buildNumberInput: function( row, name, groupClass, optionBlock, value ){
        this._createLabel( row, name );

        var cell = row.insertCell( -1 );
        var input = this._createInput( name, optionBlock, value );
        input.setAttribute( 'type', 'number' );

        if( optionBlock.min ){
            input.setAttribute( 'min', optionBlock.min );
        }

        cell.appendChild( input );
    },

    buildCheckboxInput: function( row, name, groupClass, optionBlock, value ){
        this._createLabel( row, name );

        // fucking bootstrap
        var input = document.createElement( 'input' );
        input.setAttribute( 'type', 'checkbox' );
        input.setAttribute( 'name', name );

        if( typeof value === 'boolean' ){
            input.setAttribute( 'checked', value ? 'true' : 'false' );
        }
        else if( optionBlock.def ){
            input.setAttribute( 'checked', optionBlock.def ? 'true' : 'false' );
        }

        var cell = row.insertCell( -1 );
        cell.appendChild( input );
    },

    buildSelectInput: function(row, name, groupClass, optionBlock, value ){
        this._createLabel( row, name );

        var select = document.createElement( 'select' );
        select.name = name;
        var selectedIndex = 0;
        optionBlock.value.forEach(function( element, index ){
            var option = document.createElement( 'option' );
            option.value = element;
            option.text = element;
            if(value === element ){
                selectedIndex = index;
            }
            else if( value === undefined && element === optionBlock.def ){
                selectedIndex = index;
            }

            select.add( option );
        });

        var cell = row.insertCell( -1 );
        cell.appendChild( select );
    },

    bind: function( firstElement, eventType, className, callback ){
        firstElement.addEventListener( eventType, function( event ){
            if( !event.target.classList.contains( className ) ){
                return;
            }
            callback.call( event.target, event );
        });

    }
};
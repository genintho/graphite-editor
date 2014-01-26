define(function(){

    function _buildGroup( groupClass ){
        var group = document.createElement( 'div' );
        group.setAttribute( 'class', 'form-group ' + groupClass );

        return group;
    }

    function _createLabel( text, linkTo, labelSize ){
        var label = document.createElement( 'label' );
        label.setAttribute( 'for', linkTo );
        label.setAttribute( 'class', 'col-md-' + labelSize + ' control-label' );
        label.appendChild( document.createTextNode( text ) );
        return label;
    }

    function _createInput( name, id, optionBlock, value ){
        var input = document.createElement( 'input' );

        input.setAttribute( 'name', name );
        input.setAttribute( 'id', id );
        input.setAttribute( 'class', 'form-control' );


        if( typeof value === 'string' && value.length ){
            input.setAttribute( 'value', value );
        }
        else if( optionBlock.def ){
            input.setAttribute( 'value', optionBlock.def );
        }

        return input;
    }

    function _createInputWrapper( input, inputSize ){
        var wrapper = document.createElement( 'div' );
        wrapper.setAttribute( 'class', 'col-md-' + inputSize );

        wrapper.appendChild( input );
        return wrapper;
    }

    return {
        buildStringInput: function( id, name, groupClass, labelSize, inputSize, optionBlock, value ){
            var group = _buildGroup( groupClass );
            group.appendChild( _createLabel( name, name, labelSize ) );

            var input = _createInput( name, id, optionBlock, value );
            input.setAttribute( 'type', 'text' );

            group.appendChild( _createInputWrapper( input, inputSize ) );

            return group;
        },

        buildColorInput: function( id, name, groupClass, labelSize, inputSize, optionBlock, value ){
            var group = _buildGroup( groupClass );
            group.appendChild( _createLabel( name, name, labelSize ) );

            var input = _createInput( name, id, optionBlock, value );
            input.setAttribute( 'type', 'color' );

            group.appendChild( _createInputWrapper( input, inputSize ) );
            return group;
        },

        buildNumberInput: function( id, name, groupClass, labelSize, inputSize, optionBlock, value ){
            var group = _buildGroup( groupClass );
            group.appendChild( _createLabel( name, name, labelSize ) );

            var input = _createInput( name, id, optionBlock, value );
            input.setAttribute( 'type', 'number' );

            if( optionBlock.min ){
                input.setAttribute( 'min', optionBlock.min );
            }

            group.appendChild( _createInputWrapper( input, inputSize ) );
            return group;
        },

        buildCheckboxInput: function(id, name, groupClass, labelSize, inputSize, optionBlock, value ){
            var group = _buildGroup( groupClass );
            // fucking bootstrap
            var input = document.createElement( 'input' );
            input.setAttribute( 'type', 'checkbox' );
            input.setAttribute( 'name', name );
            input.setAttribute( 'id', id );

            if( typeof value === 'boolean' ){
                input.setAttribute( 'checked', value ? 'true' : 'false' );
            }
            else if( optionBlock.def ){
                input.setAttribute( 'checked', optionBlock.def ? 'true' : 'false' );
            }

            var label = document.createElement( 'label' );
            label.appendChild( input );
            label.appendChild( document.createTextNode( '   ' + name ) );

            var div1 = document.createElement( 'div' );
            div1.setAttribute( 'class', 'col-sm-offset-2 col-sm-10' );
            div1.appendChild( label );
            group.appendChild( div1 );

            return group;
        },

        buildSelectInput: function(id, name, groupClass, labelSize, inputSize, optionBlock, value ){
            var group = _buildGroup( groupClass );

            group.appendChild( _createLabel( name, name, labelSize ) );

            var select = document.createElement( 'select' );
            select.name = name;
            select.id = id;
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

            console.log( selectedIndex );

            group.appendChild( _createInputWrapper( select, inputSize ) );
            return group;
        }
    }
});
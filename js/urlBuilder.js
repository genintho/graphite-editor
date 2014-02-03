function ChartURLBuilder( optionConfig, functionConfig ){
    this._optionConfig = optionConfig;
    this._functionConfig = functionConfig;
}

ChartURLBuilder.prototype.run = function( root, options, series ){
    var url = root;
    for( var key in options ){
        // Skip unknown parameters
        if( this._optionConfig[key] === undefined ){
            continue;
        }

        if( options[key] == this._optionConfig[key].def ){
            continue;
        }

        if( options[key].length != 0 )
            url += '&' + key + '=' + options[key];
    }

    series.forEach( function( serie ){
        url += '&target=';
        var fctStr = serie.getDataScheme();
        if( serie.getFunctions().length === 0 ){
            url += fctStr;
            return;
        }

        serie.getFunctions().forEach( function( fct ){
            var fctName = fct.getName();
            fctStr = fctName + '(' + fctStr;
            fct.getArguments().forEach( function( args, index ){
                if( this._functionConfig[fctName].arg[index].type === "string" ||
                    this._functionConfig[fctName].arg[index].type === "color"
                    ){
                    args = '"' + args + '"';
                }

                fctStr += ',' + args;
            }.bind( this ) );
            fctStr += ')';
        }.bind( this ) );
        url += fctStr;
    }.bind( this ) );
    return url;
};



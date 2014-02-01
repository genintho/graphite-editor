function ChartURLBuilder( optionConfig, functionConfig ){
    this._optionConfig = optionConfig;
    this._function = functionConfig;
}

ChartURLBuilder.prototype.run = function( root, options, series ){
    var url = root;

    for( var key in options ){
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
            url += serie.name;
            return;
        }

        serie.getFunctions().forEach( function( fct ){
            fctStr = fct.getName() + '(' + fctStr;
            fct.getArguments().forEach( function( args, index ){
                fctStr += ',' + args;
            });
            fctStr += ')';
        });
        url += fctStr;
    });
    return url;
};



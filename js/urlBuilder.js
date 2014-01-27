function ChartURLBuilder( optionConfig, functionConfig ){
    this._options = optionConfig;
    this._function = functionConfig;
}

ChartURLBuilder.prototype.run = function( root, option, series ){
    var url = '';

    return url;
};

//
//Chart.prototype.getUrl = function(){
//    var url = this._root;
//    var options = this.getOptions();
//    for( var key in options ){
//        if( options[key] == this._availableOption[key].def ){
//            continue;
//        }
//
//        if( options[key].length != 0 )
//            url += '&' + key + '=' + options[key];
//    }
//    this.getSeries().forEach( function( serie ){
//        url += '&target=';
//        var fctStr = serie.name;
//        if( serie.functions.length === 0 ){
//            url += serie.name;
//            return;
//        }
//
//        serie.functions.forEach( function( fct ){
//            fctStr = fct.name + '(' + fctStr;
//            fct.arg.forEach( function( args, index ){
//                fctStr += ',' + args;
//            });
//            fctStr += ')';
//        });
//        url += fctStr;
//    });
//
//    return url;
//};

function Serie( data ){
    data.trim();
    this._dataScheme = data;
    this._functions = [];
    this._id = Math.random();
}

Serie.prototype.getID = function(){
    return this._id;
};

Serie.prototype.getDataScheme = function(){
    return this._dataScheme;
};

Serie.prototype.addFunction = function( fct ){
    this._functions.push( fct );
};

Serie.prototype.removeFunctionByIndex = function( index ){
    this._functions.splice( index, 1 );
};

Serie.prototype.getPrettyName = function(){
    return this.getDataScheme();
};

Serie.prototype.getFunctions = function(){
    return this._functions;
};

Serie.prototype.getFunctionList = function(){
    return this.getFunctions().map( function( serieFunction ){
        return serieFunction.getName();
    });
};

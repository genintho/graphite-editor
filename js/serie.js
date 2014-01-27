function Serie( data ){
    data.trim();
    this._dataScheme = data;
    this._functions = [];
}

Serie.prototype.getDataScheme = function(){
    return this._dataScheme;
};

Serie.prototype.addFunction = function( fct ){
    this._functions.push( fct );
};

Serie.prototype.getPrettyName = function(){
    return this.getDataScheme();
};

Serie.prototype.getFunctions = function(){
    return this._functions;
};
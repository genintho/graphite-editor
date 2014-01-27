function SerieFunction( name, arg ){
    name.trim();
    this._name = name;
    this._arg = arg;
}

SerieFunction.prototype.getName = function(){
    return this._name;
};

SerieFunction.prototype.getArguments = function(){
    return this._arg;
};

SerieFunction.prototype.getArgumentAtIndex = function( index ){
    return this._arg[index];
};

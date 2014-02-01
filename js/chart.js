function Chart(){
    this._root = null;
    this._series = null;
    this._options = null;
}

Chart.prototype.getSeries = function(){
    return this._series;
};

Chart.prototype.setSeries = function( newSeries ){
    this._series = newSeries;
};

Chart.prototype.getOptions = function(){
    return this._options;
};

Chart.prototype.setOptions = function( newOption ){
    this._options = newOption;
};

Chart.prototype.getRoot = function(){
    return this._root;
};

Chart.prototype.setRoot = function( url ){
    this._root = url;
};




function Chart(){
    this._root = null;
    this._series = {};
    this._options = {};
}

Chart.prototype.getSerie = function( serieID ){
    return this._series[serieID];
};

Chart.prototype.getSeries = function(){
    var r = [];
    for( var id in this._series ){
        r.push( this._series[id] );
    }
    return r;
};

Chart.prototype.setSeries = function( newSeries ){
    this._series = {};

    newSeries.forEach( function( serie ){
        this._series[serie.getID()] = serie;
    }.bind( this ) )
};

Chart.prototype.getOptions = function(){
    return this._options;
};

Chart.prototype.addOption = function( name, value ){
    this._options[name] = value;
};

Chart.prototype.removeOption = function( name ){
    delete this._options[name];
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

Chart.prototype.addSerie = function( serie ){
    this._series[serie.getID()] = serie;
};

Chart.prototype.removeSerie = function( serieID ){
    delete this._series[serieID];
};

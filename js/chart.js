function Chart(){
    this._root = null;
    this._series = [];
    this._options = {};
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
    this._series.push( serie );
};

Chart.prototype.removeSerie = function( serieID ){
    var idIndex = -1;
    this.getSeries().forEach( function( serie, index ){
        if( serie.getID() == serieID ){
            idIndex = index;
        }
    });
    if( idIndex !== -1 ){
        this._series.splice( idIndex, 1 );
    }
};

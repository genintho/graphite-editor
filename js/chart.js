function Chart( url ){
    this._root = null;
    this._series = null;
    this._options = null;

    url = this._sanitizeURL( url );
    this.setRoot( url );
    this.setOptions( this._extractOptionsFromURL( url ) );
    this.setSeries( this._extractSeriesFromURL( url ) );
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

};

Chart.prototype._getParam = function( input ){
    var option = {
        targets: []
    };

    input = input.substr( input.indexOf( '?' ) + 1 );
    input = input.split( '&' );

    for( var tuple in input ){
        var row = input[tuple].split( '=' );
        if( row[0] === 'target' )
            option.targets.push( row[1] );
        else
            option[row[0]] = row[1];
    }
    return option;
};

Chart.prototype._sanitizeURL = function( url ){
    url.trim();
    url = decodeURIComponent( url );
    return url;
};

Chart.prototype._seriesTokenizer = function( seriesStr ){
    var token = [];
    var fct = {name: '',arg:''};

    var start = 0;
    var end = seriesStr.length-2;

    var go =0;
    while( go < 100000 ){
        go++;

        if( seriesStr.charAt(start) !== '(' ){
            fct.name += seriesStr.charAt(start);
            start++;
            continue;
        }
        else if( seriesStr.charAt(end) == '(' || seriesStr.charAt(end) == ')' ){
            fct.arg = fct.arg.split( ',' );
            if( typeof fct.arg[0] == 'string' && fct.arg[0].length == 0 ){
                fct.arg = fct.arg.slice( 1 );
            }
            token.push( fct );
            fct = {name:'', arg:''};

            if( seriesStr.charAt(end) == '(' ){
                break;
            }
            end--;
            start++;
        }
        else if( seriesStr.charAt(end) != ')' ){
            fct.arg = seriesStr.charAt(end) + fct.arg;
            end --;
            continue;
        }
        if( seriesStr.charAt(start) == ')' || seriesStr.charAt(end) == '(' ){
            break;
        }
    }
    token.reverse();
    return token;
};

Chart.prototype.setRoot = function( url ){
    this._root = url.substr( 0, url.indexOf( '?' ) + 1 );
};

Chart.prototype._extractOptionsFromURL = function( url ){
        var option = this._getParam( url );
        delete option.targets;

        return option;
};

Chart.prototype._extractSeriesFromURL = function( url ){
    var options = this._getParam( url );
    var _chart = this;
    var series = [];
    options.targets.forEach(function( target ){
        var token = _chart._seriesTokenizer( target );
        var serieName = token[0].arg[0];
        var serie = new Serie( serieName );
        token[0].arg = token[0].arg.slice( 1 );
        token.forEach(function( thing ){
            serie.addFunction( new SerieFunction( thing.name, thing.arg ) );
        });
        series.push( serie );
    });
    return series;
};


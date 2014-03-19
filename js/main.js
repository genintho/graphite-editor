var App = (function(){
    var _App = this;
    var version = '0.9.12';
    var _chart = null;

    document.getElementById( "refresh" ).addEventListener( "click", function( event ){
        var chart = ChartFactory.buildfromFormValue( UI.ChartOptions.getValue(), UI.Series.getValue() );
        chart.setRoot( _chart.getRoot() );
        _chart = chart;
        UI.Header.refresh( chart );
        UI.ChartOptions.refresh( chart.getOptions() );
        UI.Series.refresh( chart.getSeries() );
    });

    document.getElementById( "version" ).addEventListener( "change", function( event ){
        version = event.target.valueOf();
        _App.init();
    });

    document.getElementById( "btn_add_serie" ).addEventListener( "click", function( event ){
        var value = document.getElementById( "add_serie" ).value;
        value.trim();
        if( value.length === 0 ){
            return;
        }

        document.getElementById( "add_serie" ).value = "";
        PubSub.publish( EVENT.SERIE.ADD, {
            serie: value
        });
    });

    document.onpaste = function( event ){
        var item = event.clipboardData.items[0];
        //
        if(event.srcElement.id !== 'url' ||  item.kind !== 'string' ){
            return;
        }

        item.getAsString( function( url ){
            var chart = ChartFactory.buildFromURL( url, GraphiteConfig[version].SerieFunctions );
            UI.ChartOptions.init( GraphiteConfig[version].Options );
            UI.Series.init( GraphiteConfig[version].SerieFunctions );
            UI.Header.init( GraphiteConfig[version].Options, GraphiteConfig[version].SerieFunctions );
            _refresh( chart );
        });
    };

    function _refresh( chart ){
        UI.Header.refresh( chart );
        UI.ChartOptions.refresh( chart.getOptions() );
        UI.Series.refresh( chart.getSeries() );
    }

    PubSub.subscribe( EVENT.OPTION.ADD, function( evParam ){
        var value = GraphiteConfig[version].Options[evParam.key].def ? GraphiteConfig[version].Options[evParam.key].def : '';
        _chart.addOption( evParam.key, value );
        UI.ChartOptions.refresh( _chart.getOptions() );
    });

    PubSub.subscribe( EVENT.OPTION.REMOVE, function( evParam ){
        _chart.removeOption( evParam.key );
        UI.ChartOptions.refresh( _chart.getOptions() );
    });

    PubSub.subscribe( EVENT.SERIE.ADD, function( evParam ){
        var serie = new Serie( evParam.serie );
        _chart.addSerie( serie );
        UI.Series.refresh( _chart.getSeries() );
    });

    PubSub.subscribe( EVENT.SERIE.REMOVE, function( evParam ){
        _chart.removeSerie( evParam.serieID );
        UI.Series.refresh( _chart.getSeries() );
    });

    PubSub.subscribe( EVENT.SERIE.ADD_FUNCTION, function( evParam ){
        var serie = _chart.getSerie( evParam.serieID );
        var serieFct = new SerieFunction( evParam.functionName, [] );
        serie.addFunction( serieFct );
        UI.Series.refreshOne( serie );
    });

    PubSub.subscribe( EVENT.SERIE.REMOVE_FUNCTION, function( evParam ){
        console.log( evParam );
        console.log( _chart );
        var serie = _chart.getSerie( evParam.serieID );
        serie.removeFunctionByIndex( evParam.functionIndex );
        UI.Series.refreshOne( serie );
    });

    return {
        init: function(){
//            var url = "https://stats.expensify.com/render/?width=586&height=308&from=-1hours&areaMode=stacked&lineMode=staircase&target=sortByMaxima(summarize(groupByNode(stats.counters.*.auth.transaction.commit.*.count%2C6%2C%22sum%22)%2C%221min%22))";
//            var url = "https://stats.expensify.com/render/?width=586&height=308&_salt=1391291999.705&yMin=0&from=-1hours&title=Avg%20Perf%20get%20XList%20last%20hour&target=alias(movingAverage(averageSeries(stats.timers.*.web.api.get.receiptList.mean_90)%2C50)%2C%22receiptList%22)&target=alias(movingAverage(averageSeries(stats.timers.*.web.api.get.reportList.mean_90)%2C50)%2C%22reportList%22)&target=alias(movingAverage(averageSeries(stats.timers.*.web.api.get.transactionList.mean_90)%2C50)%2C%22transactionList%22)";
            var url = "https://stats.expensify.com/render/?width=586&height=308&_salt=1391291999.705&yMin=0&from=-1hours&title=Avg%20Perf%20get%20XList%20last%20hour&target=alias(movingAverage(averageSeries(stats.timers.*.web.api.get.receiptList.mean_90)%2C50)%2C%22receiptList%22)";
            _chart = ChartFactory.buildFromURL( url, GraphiteConfig[version].SerieFunctions );
            UI.ChartOptions.init( GraphiteConfig[version].Options );
            UI.Series.init( GraphiteConfig[version].SerieFunctions );
            UI.Header.init( GraphiteConfig[version].Options, GraphiteConfig[version].SerieFunctions );

            _refresh( _chart );

window.c = _chart;
        }
    }
})();


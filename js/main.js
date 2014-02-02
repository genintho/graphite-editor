var App = (function(){
    var _App = this;
    var version = '0.9.12';
    var _currentChart = null;

    document.getElementById( "refresh" ).addEventListener( "click", function( event ){
        var chart = ChartFactory.buildfromFormValue( UI.ChartOptions.getValue(), UI.Series.getValue() );
        chart.setRoot( _currentChart.getRoot() );
        _currentChart = chart;
        UI.Header.refresh( chart );
    });


    document.getElementById( "version" ).addEventListener( "change", function( event ){
        version = event.target.valueOf();
        _App.init();
    });


    document.onpaste = function( event ){
        var item = event.clipboardData.items[0];
        // event.srcElement.id !== 'url' ||
        if(  item.kind !== 'string' ){
            return;
        }

        item.getAsString( function( url ){
            _currentChart = ChartFactory.buildFromURL( url );
            UI.ChartOptions.init( GraphiteConfig[version].Options );
            UI.Series.init( GraphiteConfig[version].SerieFunctions );
            UI.Header.init( GraphiteConfig[version].Options, GraphiteConfig[version].SerieFunctions );
            _refresh( _currentChart );
        });
    };

//    GraphOptionUI.init();

    //sortByMaxima(summarize(groupByNode(stats.counters.*.auth.transaction.commit.*.count,6,"sum"),"1min"))&target=thomas(stats.counters.sc-www1.web.api.command.ApproveReport.count)
    //&target=thomas(stats.counters.sc-www1.web.api.command.ApproveReport.count)";

//        GraphOptionUI.refresh( chartOptions );
//        SeriesUI.refresh( series );
//        ImageUI.updatePreview( chartOptions, series );

    function _refresh( chart ){
        UI.Header.refresh( chart );
        UI.ChartOptions.refresh( chart.getOptions() );
        UI.Series.refresh( chart.getSeries() );
    }


    return {
        init: function(){
//            var url = "https://stats.expensify.com/render/?width=586&height=308&from=-1hours&areaMode=stacked&lineMode=staircase&target=sortByMaxima(summarize(groupByNode(stats.counters.*.auth.transaction.commit.*.count%2C6%2C%22sum%22)%2C%221min%22))";
            var url = "https://stats.expensify.com/render/?width=586&height=308&_salt=1391291999.705&yMin=0&from=-1hours&title=Avg%20Perf%20get%20XList%20last%20hour&target=alias(movingAverage(averageSeries(stats.timers.*.web.api.get.receiptList.mean_90)%2C50)%2C%22receiptList%22)&target=alias(movingAverage(averageSeries(stats.timers.*.web.api.get.reportList.mean_90)%2C50)%2C%22reportList%22)&target=alias(movingAverage(averageSeries(stats.timers.*.web.api.get.transactionList.mean_90)%2C50)%2C%22transactionList%22)";
            _currentChart = ChartFactory.buildFromURL( url );
            UI.ChartOptions.init( GraphiteConfig[version].Options );
            UI.Series.init( GraphiteConfig[version].SerieFunctions );
            UI.Header.init( GraphiteConfig[version].Options, GraphiteConfig[version].SerieFunctions );

            _refresh( _currentChart );

window.c = _currentChart;
        }
    }
})();


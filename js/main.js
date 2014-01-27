var App = (function(){
    var _App = this;
    var version = '0.9.12';

    document.getElementById( "refresh" ).addEventListener( "click", function( event ){
//        chartOptions = GraphOptionUI.getValue();
//        series = SeriesUI.getValue();
//        ImageUI.updatePreview( chartOptions, series );
    });


    document.getElementById( "version" ).addEventListener( "change", function( event ){
        version = event.target.valueOf();
        _App.init();
    });


    document.onpaste = function( event ){
        var item = event.clipboardData.items[0];
        if( event.srcElement.id !== 'url' || item.kind !== 'string' ){
            return;
        }

        item.getAsString( function( stt ){
//            stt = decodeURIComponent( stt );
//            var chartOption = URL.extractChartOption( stt );
//            GraphOptionUI.refresh( chartOption );
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
            var url = "https://stats.expensify.com/render/?width=586&height=308&from=-1hours&areaMode=stacked&lineMode=staircase&target=sortByMaxima(summarize(groupByNode(stats.counters.*.auth.transaction.commit.*.count%2C6%2C%22sum%22)%2C%221min%22))";
            var chart = new Chart( url );
            UI.ChartOptions.init( GraphiteConfig[version].Options );
            UI.Series.init( GraphiteConfig[version].SerieFunctions );
            UI.Header.init( GraphiteConfig[version].Options, GraphiteConfig[version].SerieFunctions );

            _refresh( chart );

window.c = chart;
        }
    }
})();


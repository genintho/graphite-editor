require(["graphOptionUI", "seriesUI", "url", "imageUI"], function( GraphOptionUI, SeriesUI, URL, ImageUI ){


    var chartOptions = null;
    var series = null;


    document.getElementById( "refresh" ).addEventListener( 'click', function( event ){
        chartOptions = GraphOptionUI.getValue();
        series = SeriesUI.getValue();
        ImageUI.updatePreview( chartOptions, series );
    });

    document.addEventListener( 'click', function( event ){

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

    GraphOptionUI.init();

//sortByMaxima(summarize(groupByNode(stats.counters.*.auth.transaction.commit.*.count,6,"sum"),"1min"))&target=thomas(stats.counters.sc-www1.web.api.command.ApproveReport.count)
//&target=thomas(stats.counters.sc-www1.web.api.command.ApproveReport.count)";
var stt = "https://stats.expensify.com/render/?width=586&height=308&from=-1hours&areaMode=stacked&lineMode=staircase&target=sortByMaxima(summarize(groupByNode(stats.counters.*.auth.transaction.commit.*.count%2C6%2C%22sum%22)%2C%221min%22))";
           https://stats.expensify.com/render/?width=586&height=308&from=-1hours&areaMode=stacked&lineMode=staircase&target=sortByMaxima(summarize(groupByNode(stats.counters.*.auth.transaction.commit.*.count,6,"sum"),"1min",sum,false))
    stt = stt.trim();
    stt = decodeURIComponent( stt );
    chartOptions = URL.extractChartOption( stt );
    series = URL.extractSeries( stt )
    URL.setRoot( stt );
    GraphOptionUI.refresh( chartOptions );
    SeriesUI.refresh( series );
    ImageUI.updatePreview( chartOptions, series );
});



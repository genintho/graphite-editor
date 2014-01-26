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

    stt = stt.trim();
    stt = decodeURIComponent( stt );
    chartOptions = URL.extractChartOption( stt );
    series = URL.extractSeries( stt )
    URL.setRoot( stt );
    GraphOptionUI.refresh( chartOptions );
    SeriesUI.refresh( series );
    ImageUI.updatePreview( chartOptions, series );
});



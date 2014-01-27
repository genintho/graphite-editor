var UI = UI || {};

UI.Header = (function(){

    var chartURLBuilder = null;
    var urlInput = null;
    var imagePreview = null;

    return {
        refresh: function( chart ){
            var url = chartURLBuilder.run( chart.getRoot(), chart.getOptions(), chart.getSeries() );
            imagePreview.src = url;
            urlInput.value = url;
        },

        init: function( chartOptions, SeriesFunction ){
            urlInput = document.getElementById( 'url' );
            imagePreview = document.getElementById( 'imagePreview' );

            chartURLBuilder = new ChartURLBuilder( chartOptions, SeriesFunction );
        }
    }
})();
//
//    return {
//        updatePreview: function( chartOptions, series ){
//
//            var url = URL.getChartUrl( chartOptions, series );
//
//            document.getElementById( 'url' ).value = url;
//
//            chartOptions = JSON.parse( JSON.stringify( chartOptions ) );
//            chartOptions.height = 300;
//            chartOptions.width = 600;
//
//            url = URL.getChartUrl( chartOptions, series ) + '&t=' + ( +new Date() );
//
//            document.getElementById( 'image' ).src = "";
//            document.getElementById( 'image' ).src = url;
//        }
//    };
//});
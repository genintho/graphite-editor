var UI = UI || {};

UI.Header = (function(){

    var chartURLBuilder = null;
    var urlInput = null;
    var imagePreview = null;

    return {
        refresh: function( chart ){
            var url = chartURLBuilder.run( chart.getRoot(), chart.getOptions(), chart.getSeries() );

            imagePreview.style.opacity = '0.4';
            imagePreview.src = url;

            urlInput.value = url;
        },

        init: function( chartOptions, SeriesFunction ){
            urlInput = document.getElementById( 'url' );
            imagePreview = document.getElementById( 'imagePreview' );
            imagePreview.onload = function(){
                imagePreview.style.opacity = '1';
            }

            chartURLBuilder = new ChartURLBuilder( chartOptions, SeriesFunction );
        }
    }
})();



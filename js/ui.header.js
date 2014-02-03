var UI = UI || {};

UI.Header = (function(){

    var chartURLBuilder = null;
    var urlInput = null;
    var imagePreview = null;
    var root = null;

    return {
        refresh: function( chart ){
            var url = chartURLBuilder.run( chart.getRoot(), chart.getOptions(), chart.getSeries() );

            imagePreview.style.opacity = '0.4';
            imagePreview.src = url;

            urlInput.value = url;

            root.innerHTML = chart.getRoot();
        },
        getRoot: function(){
            return root.value;
        },
        init: function( chartOptions, SeriesFunction ){
            root = document.getElementById( "root" );
            urlInput = document.getElementById( 'url' );
            imagePreview = document.getElementById( 'imagePreview' );
            imagePreview.onload = function(){
                imagePreview.style.opacity = '1';
            }

            chartURLBuilder = new ChartURLBuilder( chartOptions, SeriesFunction );
        }
    }
})();



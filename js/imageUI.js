define(["url"], function( URL ){

    return {
        updatePreview: function( chartOptions, series ){

            var url = URL.getChartUrl( chartOptions, series );

            document.getElementById( 'url' ).value = url;

            chartOptions = JSON.parse( JSON.stringify( chartOptions ) );
            chartOptions.height = 300;
            chartOptions.width = 600;

            url = URL.getChartUrl( chartOptions, series ) + '&t=' + ( +new Date() );

            document.getElementById( 'image' ).src = "";
            document.getElementById( 'image' ).src = url;
        }
    };
});
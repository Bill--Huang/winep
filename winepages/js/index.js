jQuery(document).ready(function ($) {

    // 如何针对不同的机器对每次投票进行记录并最终得出统计


    $(document).foundation();
    var wineScore = 5;
    $('[data-slider]').on('change.fndtn.slider', function(){
        // do something when the value changes
        console.log($('#wine-score-slider').attr('data-slider'));
        wineScore = $('#wine-score-slider').attr('data-slider');
    });

    $('#win-score-button').click(function() {
        alert(wineScore);
    });

    ServiceHelper.sendUpdateWineScore(
        {data: 1}, 
        function(data){

        }, 
        function(){
            
        }
    );

    // if this is the first wine, get a session of cookies from server
    // to make a score history for the final page
    // ajax.get(.., ..);

    // interactive score scroll 
    // $( "#score-slider" ).slider({
    //   value:100,
    //   min: 0,
    //   max: 10,
    //   step: 1,
    //   slide: function( event, ui ) {
    //     // $( "#amount" ).val( "$" + ui.value );
    //   }
    // });
    // $( "#amount" ).val( "$" + $( "#slider" ).slider( "value" ) );

    // 
    // $('#wine-score-slider').on('change', function () {
    //     alert(this.value);
    //     wineScore = this.value;
    // });



});
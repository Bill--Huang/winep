jQuery(document).ready(function ($) {
    $(document).foundation();
    
    setInterval(function(){
        // loop for upate data
        console.log('Rquest: ')
        scoreUpdateRequest();

    }, 4000);

    // ajax function 
    function scoreUpdateRequest() {
        ServiceHelper.getWineScoreRequest(
            {}, 
            function(data){
                
                // update ui
                var scoreTextArray = $('.content-column .score-div');
                scoreTextArray.each(function(index, element) {
                    var temp = data['w' + (index + 1)];
                    temp = ServiceHelper.decimal(temp, 2);
                    // $(element).css("width", (temp * 10) + "%");
                    $(element).animate({width:(temp * 10) + "%"}, 800);

                });
        
            }, 
            function(){

            }
        );
    }

});
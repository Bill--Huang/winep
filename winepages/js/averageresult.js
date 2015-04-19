jQuery(document).ready(function ($) {
    $(document).foundation();
    
    setInterval(function(){
        // loop for upate data
        scoreUpdateRequest();

    }, 700);

    // ajax function 
    function scoreUpdateRequest() {
        ServiceHelper.getWineScoreRequest(
            {}, 
            function(data){
                // update ui
                var scoreTextArray = $('.content-column .score-div');
                scoreTextArray.each(function(index, element) {
                    var temp = data['w' + (index + 1)];
                    temp = ServiceHelper.decimal(temp, 1);

                    var standardLength = parseInt($("#width-standard").css("width"));

                    // 
                    if((((temp / 10) * standardLength) + "px") != $(element).css("width")) {
                        // console.log("new :" + (((temp / 10) * standardLength) + "px"));
                        // console.log("old :" + $(element).css("width"));
                        $(element).animate({width:(temp * 10) + "%"}, 500);
                    }

                });
        
            }, 
            function(){

            }
        );
    }

});
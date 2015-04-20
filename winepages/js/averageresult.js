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
                    var standardLength = parseInt($("#width-standard").css("width"));
                    var newL = parseInt(ServiceHelper.decimal(temp, 1) / 10 * standardLength);
                    var oldL = parseInt($(element).css("width"));
                    // console.log("new: " + newL);
                    // console.log("old: " + oldL);
                    // 
                    if(newL != oldL) {
                        // console.log("change");
                        $(element).animate({width: newL + "px"}, 500);
                    }
                });
            }, 
            function(){

            }
        );
    }

});
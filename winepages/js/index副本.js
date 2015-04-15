jQuery(document).ready(function ($) {
    $(document).foundation();
    
    setInterval(function(){
        // loop for upate data
        // scoreUpdateRequest();
    }, 1000);

    // ajax function 
    function scoreUpdateRequest() {
        ServiceHelper.getWindScoreRequest(
            {data: 1}, 
            function(data){
                // update ui
            }, 
            function(){

            }
        );
    }

});
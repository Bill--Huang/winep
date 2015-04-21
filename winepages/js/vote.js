jQuery(document).ready(function ($) {
    
    var cookiesKey = "b_uid";
    var cookiesValue =  $.cookie(cookiesKey);
    var isCookies = false;

    if(cookiesValue != undefined) {
        // already have session
        isCookies = true;
        console.log("already have session: " + cookiesValue);
    } else {
        // get session
        ServiceHelper.sendSessionRequest(
            {},
            function(data) {
                // get seesion
                var uid = data['uid'];
                $.cookie(cookiesKey, uid, { path: '/' });
                cookiesValue = uid;
                isCookies = true;

                console.log("new session: " + uid);
            },

            function() {

            }

        );
    }

    document.title = "玛歌酒庄";

    // 根据 ip 对每次投票进行记录并最终得出统计
    var wineIndex = $('body').attr('data-role');
    // console.log(wineIndex);

    $(document).foundation();
    var wineScore = 5;
    sendData();

    var isSetTimeout = false;
    $('[data-slider]').on('change.fndtn.slider', function(){
        // do something when the value changes

        var sliderValue = $('#wine-score-slider').attr('data-slider');
        var tempOpacity = 1 - (sliderValue / 10);
        // $("#gradient-bg").css("opacity", tempOpacity);
        $("#gradient-bg").animate({opacity: tempOpacity}, 2);

        if(wineScore != $('#wine-score-slider').attr('data-slider')) {

            console.log($('#wine-score-slider').attr('data-slider'));
            wineScore = $('#wine-score-slider').attr('data-slider');
            
            sendData();

            if(wineIndex == 4) {
                if(!isSetTimeout) {
                    isSetTimeout = true;
                    // final page
                    setTimeout(function() {
                        // show personal result page
                        var id = document.domain;
                        if(isCookies) {
                            id = cookiesValue;
                        }

                        ServiceHelper.getPersonalWineScoreRequest(
                            {
                                uid: cookiesValue
                            }, 
                            function(data){
                                // alert(data);
                                var scoreTextArray = $('.content-column .score-div');
                                scoreTextArray.each(function(index, element) {
                                    var temp = data['w' + (index + 1)];
                                    temp = ServiceHelper.decimal(temp, 2);
                                    $(element).css("width", (temp * 10) + "%");
                                });


                                $("#main-content").animate({opacity:'0'}, 1200, function(){
                                    $("#main-content").css('display', 'none');
                                });
                                $("body").addClass("personal-bg");
                                document.title = "玛歌酒庄";
                                $("#s-main-content").css('display', 'block');

                                // ui
                                var containerHeight = $("#s-score-cotianer").height();
                                var winHeight = $("body").height();
                                
                                console.log(containerHeight);
                                console.log(winHeight);
                                if(containerHeight > (winHeight)) {
                                    $(".content-imgs").css("width", "20%");
                                    $(".content-score").css("margin-left", "20%");
                                    // alert("change");
                                    // $(".content-score").css("width", "80%");
                                    console.log("change");
                                }

                                $("#s-main-content").animate({opacity:'1'}, 1500, function(){

                                });
                            }, 
                            function(){
                                
                            }
                        );
                    }, 2000);
                }
            }
        }
    });

    $('#win-score-button').click(function() {
        sendData();
        // testIndexCount++;
    });

    function sendData() {
        ServiceHelper.sendUpdateWineScore(
            {
                uid: cookiesValue,
                wineIndex: wineIndex,
                wineScore: wineScore
            }, 
            function(data){
                // alert(data);
            }, 
            function(){
                
            }
        );
    }


    // ui
    var winHeight = $(window).height();
    var imgHeight = $('#wine-text').height();
    if((imgHeight * 0.94) > (winHeight * 0.95)) {
        $('#wine-text').css('width', '62%');
    }

    
    

    // $('#main-content').css('height', winHeight);
    // $('#main-content-container').css('height', winHeight * 0.8);

});
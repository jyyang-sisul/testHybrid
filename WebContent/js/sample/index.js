var d = new Date();
var month =  "" + (d.getMonth() + 1);
if((d.getMonth() + 1) < 10)
    month = "0" + month;
var day =  "" + d.getDate();
if( d.getDate() < 10)
    day = "0" + day;
var date1 =   d.getFullYear() + "" +  month + "" +  day;
// 리스트조회
var getAreaList = function(){
    $.mobile.changePage("#pageList");
    for(var i=0; i< areas.codes.length; i++  ){
        //console.log("<li><img src='" + data.images[i].url + "' alt='icon' class='ui-li-bigicon'>" + data.images[i].name + "</li>");
        $("#listArea").append("<li code='" + areas.codes[i].code + "'>" + areas.codes[i].name + "</li>")
    }
    $("#listArea" ).listview( "refresh" );
    
    $("#listArea>li").click(function(){
        console.log($(this));
        var selectedItem =  $(this).attr("code");
        getWeatherDetail(selectedItem);
    }); 
    
}
// 상세조회
var getDetailData = function(param){
    console.log(param);
    var data = JSON.parse(param);
    console.log(data);
    console.log(data.response.header.resultCode);
    if(data.response.header.resultCode == "0000"){
        $.mobile.changePage("#pageDetail");
        console.log(data.response.body.items.item);
        $("#listWeather").empty();
        $("#date1").html( d.getFullYear() + "년 " + (d.getMonth() + 1) + "월 " + d.getDate() + "일");

        if(typeof data.response.body.items.item.wf2Am != "undefined" ){
            items.codes[0].data = data.response.body.items.item.wf2Am;
        }
        if(typeof data.response.body.items.item.wf2Pm != "undefined" ){
            items.codes[1].data = data.response.body.items.item.wf2Pm;
        }
        if(typeof data.response.body.items.item.wf3Am != "undefined" ){
            items.codes[2].data = data.response.body.items.item.wf3Am;
        }
        if(typeof data.response.body.items.item.wf3Pm != "undefined" ){
            items.codes[3].data = data.response.body.items.item.wf3Pm;
        }
        if(typeof data.response.body.items.item.wf4Am != "undefined" ){
            items.codes[4].data = data.response.body.items.item.wf4Am;
        }
        if(typeof data.response.body.items.item.wf4Pm != "undefined" ){
            items.codes[5].data = data.response.body.items.item.wf4Pm;
        }
        if(typeof data.response.body.items.item.wf5Am != "undefined" ){
            items.codes[6].data = data.response.body.items.item.wf5Am;
        }
        if(typeof data.response.body.items.item.wf5Pm != "undefined" ){
            items.codes[7].data = data.response.body.items.item.wf5Pm;
        }
        if(typeof data.response.body.items.item.wf6Am != "undefined" ){
            items.codes[8].data = data.response.body.items.item.wf6Am;
        }
        if(typeof data.response.body.items.item.wf6Pm != "undefined" ){
            items.codes[9].data = data.response.body.items.item.wf6Pm;
        }
        if(typeof data.response.body.items.item.wf7Am != "undefined" ){
            items.codes[10].data = data.response.body.items.item.wf7Am;
        }
        if(typeof data.response.body.items.item.wf7Pm != "undefined" ){
            items.codes[11].data = data.response.body.items.item.wf7Pm;             
        }
        for(var i=0; i< items.codes.length; i++  ){
            if(items.codes[i].data != ""){
                $("#listWeather").append("<li code='" + items.codes[i].code + "'>" + 
                    items.codes[i].name + " " + 
                    items.codes[i].data + "</li>");
            }     
        }
        $("#listWeather").listview( "refresh" );    
    }else{
        alert(data.response.header.resultMsg);
    }
}
var getWeatherDetail = function(param){
    alert('hi1');
    //url = "http://newsky2.kma.go.kr/service/MiddleFrcstInfoService/getMiddleLandWeather?ServiceKey=okQYsU0bBQWPOzRsa2oZ8GY7%2B7wwhYF78ZQdRNxehq56kDhJGrv55Y96Y3mlA5HR%2Bb6JwbdRh%2BnmlC%2BM2R%2BThw%3D%3D&regId=" + param + "&tmFc=201404080600&numOfRows=1&pageNo=1&_type=json"; 
    url = "http://newsky2.kma.go.kr/service/MiddleFrcstInfoService/getMiddleLandWeather?ServiceKey=okQYsU0bBQWPOzRsa2oZ8GY7%2B7wwhYF78ZQdRNxehq56kDhJGrv55Y96Y3mlA5HR%2Bb6JwbdRh%2BnmlC%2BM2R%2BThw%3D%3D&regId=11B00000&tmFc=201310171800&numOfRows=1&pageNo=1&_type=json";
    //url = "http://piece.mireene.com/jqm/ch18/gallery/weathertest.jsp";
    $.ajax({
        type:"GET",
        url:url,
        cache:false,
        dataType:"text",
        success:getDetailData
    });
}

//초기화
var init = function () {
    // 상세화면의 BACK버튼
    $("#btnBack").off( "click").on("click", function(){
        event.stopImmediatePropagation();
        event.preventDefault()
        $.mobile.changePage("#pageList");
    });
    // 리스트의 항목을 터치했을 경우
    $("#listGallery").off( "click").on("click", "li", function () {
        event.stopImmediatePropagation();
        event.preventDefault()
        alert($(this).attr("dataid"));
        getGalleryDetail($(this).attr("dataid"));   
    }); 
    // 초기화면에서 갤러리입장을 터치했을 경우
    $("#moveAreaList").off( "click").on("click", function(){ 
        event.stopImmediatePropagation();
        event.preventDefault()
        getAreaList();   
    })
};
$(document).bind( 'pageinit', init );


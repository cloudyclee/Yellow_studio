$(window).scroll(function(){
  var h = $(this).scrollTop();
  if(h > 0){
    $("#navigation,.explore").addClass("at_top");
    $(".mountain").css("animation","upin 0.5s forwards");
  } else {
    $("#navigation,.explore").removeClass("at_top");
    $(".mountain").css("animation","upin_r 0.5s forwards");
  };
});

$(".nav-link,a").click(function(e){
  //不觸發事件
  e.preventDefault();
  var id = $(this).attr("href");
  const $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
  
  // 滑動動畫
    $($body).animate({
      scrollTop: $(id).offset().top
    }, 500, "swing");
  
  //所有區塊摺疊
    $(".navbar-toggler").addClass("collapsed");
    $(".navbar-toggler").attr("aria-expanded", "false");
    $(".navbar-collapse").removeClass("show");
    $(".navbar-collapse").addClass("collapsed");
});

function stand_cat(id,x){
  var catplace = $(id).offset().left + $(id).width()/2;
  if (Math.abs(x - catplace) < 50){
    $(id).css("bottom", "0px");
  } else {
    $(id).css("bottom", "-30px")
  };
};

$(window).mousemove(function(evt){
  var pageX = evt.pageX;
  var pageY = evt.pageY;
  var x = pageX-$("#about").offset().left;
  var y = pageY-$("#about").offset().top;
  
  //超過區域則隱藏
  if (y < 0 || y > $("#about").outerHeight()){
    $("#cross").css("opacity", "0");
  } else {
    $("#cross").css("opacity", "1");
  };
  
  //讓cross隨著滑鼠移動
  $("#cross").css("left",x + "px");
  $("#cross").css("top",y + "px");
  
  //貓貓看滑鼠
  var catX = $(".cat").offset().left + $(".cat").width()/2;
  var catY = $(".cat").offset().top;
  var cat_url="http://awiclass.monoame.com/catpic/";
  
  if (pageX - catX > 50){
    if (pageY - catY < -100){
      $(".cat").attr("src", cat_url + "cat_righttop.png");
    } else {
      $(".cat").attr("src", cat_url + "cat_right.png");
    };
  } else if (pageX - catX < -100){
    if (pageY - catY < -100){
      $(".cat").attr("src", cat_url + "cat_lefttop.png");
    } else {
      $(".cat").attr("src", cat_url + "cat_left.png");
    };
  } else {
    $(".cat").attr("src", cat_url + "cat_top.png");
  };
  
  //一些動畫
  $(".mountain").css("transform", "translateX(" + y/20 + "px)");
  $(".tri1").css("transform", "translateX(" + y/5 + "px) rotate(-10deg)");
  $(".tri2").css("transform", "translateX(" + y/10 + "px) rotate(-10deg)");
  $(".tri3").css("transform", "translateX(" + y/15 + "px) rotate(-10deg)");
  $(".tri4").css("transform", "translateX(" + y/20 + "px) rotate(-10deg)");
  $(".tri5").css("transform", "translateX(" + y/30 + "px) rotate(-10deg)");
  $(".r1text").css("transform", "translateX(" + x/3 + "px)");
  $(".r2text").css("transform", "translateX(" + x/10 + "px)");
  $(".r3text").css("transform", "translateX(" + x/20 + "px)");
  
  stand_cat("#cat_blue", pageX);
  stand_cat("#cat_gray", pageX);
  stand_cat("#cat_yellow", pageX);
});

const vm = {
  data () {
    return {
      works: ""
    }
  },
  mounted: function(){
    var vobj = this;
    $.ajax({
      url: "https://awiclass.monoame.com/api/command.php?type=get&name=projects",
      success: function(res){
        vobj.works = JSON.parse(res);
      }
    });
  }
}

Vue.createApp(vm).mount('#works');
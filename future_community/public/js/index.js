'use strict'
window.onload = function(){
  
//*******************导航栏筋斗云效果开始*******************

  //获取云彩
  var cloud = document.getElementById("cloud");
  //获取所有的li标签
  var list = document.getElementById("navBar").getElementsByTagName('li');
  //循环遍历分别注册鼠标进入,鼠标离开,点击事件
  for (var i = 0; i < list.length; i++) {
    //鼠标进入事件
    list[i].onmouseover = mouseoverHandle;
    //点击事件
    list[i].onclick = clickHandle;
    //鼠标离开事件
    list[i].onmouseout = mouseoutHandle;
  }
  function mouseoverHandle() {//进入
    //移动到鼠标此次进入的li的位置
    animate(cloud, {left:this.offsetLeft});
  }
  //点击的时候,记录此次点击的位置
  var lastPosition = 20;
  function clickHandle() {//点击
    lastPosition = this.offsetLeft;
  }
  function mouseoutHandle() {//离开
    animate(cloud, {left:lastPosition});
  }

  
    $('#navBar>.dropdown').mousemove(function() {
      $(this).find('.dropdown-layer').slideDown("slow"); 
    });
    $('#navBar>.dropdown').mouseleave(function() {
      $(this).find('.dropdown-layer').slideUp("fast"); 
    });
    $('.dropdown-wlw').mousemove(function() {
      $(this).find('.right-layer').slideDown("fast"); 
    });
    $('.dropdown-wlw').mouseleave(function() {
      $(this).find('.right-layer').slideUp("fast"); 
    });
//*******************导航栏筋斗云效果结束*******************

//*******************轮播图特效开始*******************
  var config = [
      {
        width: 500,
        marginTop: 20,
        marginLeft: 120,
        opacity: 0.5,
        zIndex: 2,
      },//0
      {
        width: 580,
        marginTop: 50,
        marginLeft: 0,
        opacity: 0.8,
        zIndex: 3,
      },//1
      {
        width: 900,
        marginTop: 75,
        marginLeft: 224,
        opacity: 1,
        zIndex: 4,
      },//2
      {
        width: 580,
        marginTop: 50,
        marginLeft: 768,
        opacity: 0.8,
        zIndex: 3,
      },//3
      {
        width: 500,
        marginTop: 20,
        marginLeft: 728,
        opacity: 0.5,
        zIndex: 2,
      }//4
  ];
    var flag = true;
    var list = my$('slide').getElementsByTagName("li");
    console.log(list)
    //自动播放
    var timeId = setInterval(clickRight,1000);
    function assign(){
      for(var i=0;i<list.length;i++){
        animate(list[i],config[i],function(){
          flag = true;
        });
      }
    }
    assign();
    //右边按钮
    my$("arrRight").onclick = clickRight; 
    function clickRight () {
        if(flag){
          flag = false;
          config.unshift(config.pop());
              assign();//重新分配 
        }
    }
    //左边按钮
    my$("arrLeft").onclick = function(){
      if(flag){
        flag = false;
        config.push(config.shift());
          assign();//重新分配
      }     
    }
    //鼠标进入
    my$('slide').onmouseover=function(){
      animate(my$('arrow'),{"opacity":1});
      clearInterval(timeId);
    }
    //鼠标移出
    my$('slide').onmouseout=function(){
      animate(my$('arrow'),{"opacity":0});
      timeId = setInterval(clickRight,1000);
    }
//*******************轮播图特效结束*******************

//*******************解决方案跳转开始*******************
    var liList = my$('inner-solution').getElementsByTagName('li');
      for(var i=0;i<liList.length;i++){
        liList[i].onclick = function(){
          this.getElementsByTagName('a')[0].click();
        }
    }
//*******************解决方案跳转结束*******************

//*******************产品栏动画开始*******************
    var ulObjs = document.querySelectorAll('.pro-list')
    var liObj = ulObjs[0].getElementsByTagName('li')
    var liObj1 = ulObjs[1].getElementsByTagName('li')
    var arr=[]
    var arr1=[]
    for(let i=0;i<liObj.length;i++){
      var imgs = liObj[i].children[0].children[0]
      arr.push(imgs)
      var imgs1 = liObj1[i].children[0].children[0]
      arr1.push(imgs1)
    }
    for(let i=0;i<liObj.length;i++){
      liObj[i].onmouseover = function(){
          arr[i].style.transform = 'scale(1.2)'
          arr[i].style.transition = 'all 10s ease'
      }
      liObj[i].onmouseout = function(){
          arr[i].style.transform = 'scale(1)'
          arr[i].style.transition = 'all 1s ease'
      }
      liObj1[i].onmouseover = function(){
          arr1[i].style.transform = 'scale(1.2)'
          arr1[i].style.transition = 'all 10s ease'
      }
      liObj1[i].onmouseout = function(){
          arr1[i].style.transform = 'scale(1)'
          arr1[i].style.transition = 'all 1s ease'
      }
    }
//*******************产品栏动画结束*******************

//*******************锚点动画开始*******************
    var com_top = $('.main-community').offset().top;
        $('#com').click(function () {
            $('html,body').animate({scrollTop:com_top},1000);
        })
//*******************锚点动画结束*******************

//*******************鼠标滚动动画开始*******************
  window.onscroll = function(){

      let oAs = document.querySelectorAll(".com-bd-right")
      for(var i=0;i<oAs.length;i++){
        if((document.documentElement.scrollTop+ document.documentElement.clientHeight) >= (oAs[i].offsetTop +200)){
          oAs[i].className = 'com-bd-right layui-anim layui-anim-rotate'      
        }
      }
      //counterBox
      var countBox = document.querySelector('.counting-box')
      var countBoxes = document.querySelectorAll('.col-md-4')
      var arr = []
      for(let i=0;i<countBoxes.length;i++){
         arr.push(countBoxes[i].children[0])
      }
      for(let j=0;j<arr.length;j++){
        if((document.documentElement.scrollTop+ document.documentElement.clientHeight) >= (countBox.offsetTop+200)){
          arr[j].className = 'counter'      
        }
      }
      $('.counter').each(function() {
      var $this = $(this),
          countTo = $this.attr('data-count');
      
      $({ countNum: $this.text()}).animate({
        countNum: countTo
      },
      {
        duration: 2000,
        easing:'linear',
        step: function() {
          $this.text(Math.floor(this.countNum));
        },
        complete: function() {
          $this.text(this.countNum);
        }
      });  
    });

    //关于我们
    var teamli2 = my$('team-li2')
    var teamDiv = document.querySelector('.team')  
    if((document.documentElement.scrollTop+ document.documentElement.clientHeight) >= (teamDiv.offsetTop+200)){
        teamli2.style.marginRight = '40px';
    }
    
    //*******************回到顶部开始*******************
      var toTop = my$('toTop')
      if(document.documentElement.scrollTop>=550){
        toTop.style.display = 'block'
      }else{
        toTop.style.display = 'none'
      }
    //*******************回到顶部结束*******************
  }
//*******************鼠标滚动动画结束*******************

//*******************回到顶部开始*******************
    $('#toTop').click(function () {
        $('html,body').animate({scrollTop:0},1000);
    })
//*******************回到顶部结束*******************

}



'use strict'
// 滚动动画开始
	window.onload = function(){

		//图片渐现效果开始
			var carousel = my$('carousel')
			var carousel_title =  my$('carousel-title')
			carousel.style.opacity = '1'
			setInterval(function(){
				carousel_title.className = 'carousel-title block layui-anim layui-anim-up'
			}, 1000)
		//图片渐现效果结束
		

		window.onscroll = function(){

			//功能模块飞入动画开始
				var fuls = document.querySelector('.meal-fun')
				var fli1 = my$('f-li1')
				var fli2 = my$('f-li2')
				var fli3 = my$('f-li3')
				var fli4 = my$('f-li4')
				var fli5 = my$('f-li5')
				var fli6 = my$('f-li6')
				var fli7 = my$('f-li7')
				var fli8 = my$('f-li8')
				if((document.documentElement.scrollTop + document.documentElement.clientHeight) >= (fuls.offsetTop+600)){
					animate1(fli1,{marginLeft:0},function(){
						animate1(fli2,{marginLeft:0},function(){
							animate1(fli3,{marginLeft:0},function(){
								animate1(fli4,{marginLeft:0})
							})
						})
					})
				}
				if((document.documentElement.scrollTop + document.documentElement.clientHeight) >= (fuls.offsetTop+1100)){
					animate1(fli5,{marginLeft:0},function(){
						animate1(fli6,{marginLeft:0},function(){
							animate1(fli7,{marginLeft:0},function(){
								animate1(fli8,{marginLeft:0})
							})
						})
					})
				}

				var fimg1 = my$('f-img1')
				if((document.documentElement.scrollTop + document.documentElement.clientHeight) >= (fuls.offsetTop+300)){
					animate1(fimg1,{marginLeft:0})
				}

				var fimg2 = my$('f-img2')
				if((document.documentElement.scrollTop + document.documentElement.clientHeight) >= (fuls.offsetTop+900)){
					animate1(fimg2,{marginRight:0})
				}
			//功能模块飞入动画结束

			//比较模块动画开始
				var com = document.querySelector('.meal-compare')
				var ul1_left = my$('ul1-left')
				var ul1_right = my$('ul1-right')
				var ul2_left = my$('ul2-left')
				var ul2_right = my$('ul2-right')
				var ul3_left = my$('ul3-left')
				var ul3_right = my$('ul3-right')
				var ul4_left = my$('ul4-left')
				var ul4_right = my$('ul4-right')
				var ul5_left = my$('ul5-left')
				var ul5_right = my$('ul5-right')
				var ul6_left = my$('ul6-left')
				var ul6_right = my$('ul6-right')
				if((document.documentElement.scrollTop + document.documentElement.clientHeight) >= (com.offsetTop+200)){        
					animate(ul1_left,{marginLeft:0},function(){
						animate(ul1_right,{marginRight:0},function(){
							animate(ul2_left,{marginLeft:0},function(){
								animate(ul2_right,{marginRight:0},function(){
									animate(ul3_left,{marginLeft:0},function(){
										animate(ul3_right,{marginRight:0},function(){
											animate(ul4_left,{marginLeft:0},function(){
												animate(ul4_right,{marginRight:0},function(){
													animate(ul5_left,{marginLeft:0},function(){
														animate(ul5_right,{marginRight:0},function(){
															animate(ul6_left,{marginLeft:0},function(){
																animate(ul6_right,{marginRight:0}) 
															}) 
														}) 
													}) 
												}) 
											}) 
										}) 
									}) 
								}) 
							}) 
						})  
					})    
				}
			//比较模块动画结束

		//*******************回到顶部开始*******************
		     var toTop = my$('toTop')
		     if(document.documentElement.scrollTop>=550){
		       toTop.style.display = 'block'
		     }else{
		       toTop.style.display = 'none'
		     }
	    //*******************回到顶部结束*******************
		}

	//*******************回到顶部开始*******************
	    $('#toTop').click(function () {
	        $('html,body').animate({scrollTop:0},1000);
	    })
	//*******************回到顶部结束*******************
	}
// 滚动动画结束
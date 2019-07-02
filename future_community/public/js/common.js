//根据id获取元素
function my$(id) {
    return document.getElementById(id);
}
//获取一个元素的任意一个样式属性值
    function getStyle(element,attr){
        return window.getComputedStyle?window.getComputedStyle(element,null)[attr]:element.currentStyle[attr];
    }
//移动动画
function animate(element, json , fn) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function() {
      var flag = true; //假设全都已经到达目标值
      for (var attr in json) {
        if (attr == "zIndex") {
          element.style[attr] = json[attr];
        }else if(attr == "backgroundColor"){
          element.style[attr] = json[attr];
        }else if (attr == "opacity") {
          //获取当前透明度
          var current = getStyle(element, attr) * 100;
          var target = json[attr] * 100;
          var step = (target - current) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          current += step;
          element.style[attr] = current / 100;
        } else {
          //获取当前div的位置
          var current = parseInt(getStyle(element, attr));
          var target = json[attr];
          var step = (target - current) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          current += step;
          element.style[attr] = current + 'px';
        }
        if (current != target) {
          flag = false;
        }
      }
      if (flag) {
        clearInterval(element.timeId);
        if(fn){
          fn();
        }
      }
    },10);
  };
  function animate1(element, json , fn) {
    //点击一次就清除一次定时器，这里是为了解决多次点击之后速度更变的问题。
    clearInterval(element.timeId);
    element.timeId = setInterval(function() {
      var flag = true; //假设全都已经到达目标值
      for (var attr in json) {

        if (attr == "zIndex") {
          element.style[attr] = json[attr];
        }else if(attr == "backgroundColor"){
          element.style[attr] = json[attr];
        }else if (attr == "opacity") {
          //获取当前透明度
          var current = getStyle(element, attr) * 100;
          var target = json[attr] * 100;
          var step = (target - current) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          current += step;
          element.style[attr] = current / 100;
        } else {
          //获取当前div的位置
          var current = parseInt(getStyle(element, attr));
          var target = json[attr];
          var step = (target - current) / 1.01;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          current += step;
          element.style[attr] = current + 'px';
        }
        if (current != target) {
          flag = false;
        }
      }
      if (flag) {
        clearInterval(element.timeId);
        if(fn){
          fn();
        }
      }
    },10);
  };
/**
 * 获取的是页面向上或者向左卷曲出去的距离的值,返回的是对象
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function getScroll() {
    return {
        top: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0,
        left: window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0
    };
}  
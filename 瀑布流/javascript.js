window.onload=function(){
    waterfall('main','imgBox');
     var dataInt = {"data":[{"src":'01.jpg'},{"src":'02.jpg'},{"src":'03.jpg'},{"src":'04.png'},{"src":'05.jpg'},{"src":'06.jpg'},{"src":'07.jpg'},{"src":'08.jpg'},{"src":'09.jpg'},{"src":'10.jpg'}]};
     //当拖动滚动条时触发函数
     window.onscroll = function(){
        // 调用scrollbar()函数 如果得到的结果返回true 动态的将dataInt对象里面的图片链接添加到页面当中
        if(scrollbar()){
            var main = document.getElementById('main');
            for(var i=0;i<dataInt.data.length;i++){
                var imgBox = document.createElement('div');
                imgBox.className = 'imgBox';
                var pic = document.createElement('div');
                pic.className = 'pic';
                var img = document.createElement('img');
                img.src = "images/" + dataInt.data[i].src;
                pic.appendChild(img);
                imgBox.appendChild(pic);
                main.appendChild(imgBox);
            }
            waterfall('main','imgBox');
        }
     }

}

function waterfall(parent,imgBox){
    //获取父元素
    var main = document.getElementById(parent);
    //获取所有子元素
    var imgBoxs = main.getElementsByClassName('imgBox');
    // 获取子元素和网页父元素的宽度
    var childWidth = imgBoxs[0].offsetWidth;
    var pageWidth = document.documentElement.scrollWidth;
    // 计算列数
    var col = Math.floor(pageWidth / childWidth);
    //设置父元素main的宽度
    main.style.cssText = "width:"+ col * childWidth + "px;margin:0 auto";
//    获取当第一行子元素的高度
    var arr = [];
    for(var i=0;i<imgBoxs.length;i++){
        if(i < col){
            var imgBoxsH = imgBoxs[i].offsetHeight;
            arr.push(imgBoxsH);
        }else{
            //    获取高度最矮的元素
            var minH = Math.min.apply(null,arr);
            var index =  minEleIndex(arr,minH);
            //    设置下一行元素的位置
            imgBoxs[i].style.position = 'absolute';
            imgBoxs[i].style.top = minH + 'px';
            imgBoxs[i].style.left = childWidth * index +'px';
            arr[index] += imgBoxs[i].offsetHeight;
        }
    }
}
//获取最小值在数组当中的键位值
function minEleIndex(arr,val){
    return arr.indexOf(val);
}

function scrollbar(){
    //当最后一个元素距离最顶部的距离小于（滚动条距离顶部的距离加上页面可视高度）返回true 否则返回false
    var main = document.getElementById('main');
    var imgBoxs = main.getElementsByClassName('imgBox');
    var lastChildH = imgBoxs[imgBoxs.length - 1].offsetTop + imgBoxs[imgBoxs.length-1].offsetHeight;
    var clientH= document.documentElement.clientHeight;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    return (lastChildH < scrollTop + clientH )?true:false;
}



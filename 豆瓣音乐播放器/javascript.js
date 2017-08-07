window.onload = function(){
    var nameArr = [
        "Adele-Hellow",
        "Adele-RollingInTheDeep",
        "Adele-SendMyLove(ToYourNewLover)",
        "BrunoMars-Lighters",
        "Eminem-LoveTheWayYouLie",
        "薛之谦-暧昧",
        "薛之谦-刚刚好",
        "薛之谦-演员",
        "薛之谦-绅士"
    ];
    var btnPlay = document.getElementById("btn-play"),
        btnPrev = document.getElementById("btn-prev"),
        btnNext = document.getElementById("btn-next"),
        audio = document.getElementById("audio"),
        iPlay = document.getElementById("play"),
        songTit = document.getElementById("song-tit"),
        trs = document.getElementsByTagName("tr"),
        songPic = document.getElementById("song-pic"),
        disEmpty = document.getElementsByClassName("empty")[0],
        clearAll = document.getElementsByClassName("clearall")[0],
        tBale = document.getElementsByClassName("table")[0],
        tBody = document.getElementsByTagName("tbody")[0],
        songTime = document.getElementsByClassName("song-time")[0],
        oddTime = document.getElementsByClassName("odd-time")[0],
        progress = document.getElementsByClassName("progress")[0],
        progressBar = document.getElementsByClassName("progressBar")[0],
        nPlay = document.getElementsByClassName("n-playing")[0],
        btnMode = document.getElementById("btn-mode"),
        z = 1,
        arr = [],
        imgs = [];
    //将歌曲信息插入网页当中
    (function(){
        for(var i=0;i<nameArr.length;i++){
            var singName = nameArr[i].replace(/([^-]+)-([^-]+)/g,'$1');
            var songName = nameArr[i].replace(/([^-]+)-([^-]+)/g,'$2');
            imgs.push(songName);
            songName = songName.replace(/([A-Z])/g," $1");
            arr.push([singName,songName]);
        }
        //添加图片
        songPic.src="imgs/"+imgs[0]+".jpg";
        //动态的生成元素将歌曲信息插入到页面

        for(var i=0;i<arr.length;i++){
            var trs = document.createElement("tr");
            trs.innerHTML = "<td class='ico'><a href='#' class='star' title='收藏'><i class='fa fa-star-o'></i></a> </td><td class='song'><span>"+ arr[i][1] +"</span></td><td class='singer'><span>"+ arr[i][0] +"</span></td><td class='download'><a href='#' title='下载歌曲'><i class='fa fa-download'></i></a></td><td class='removed'><a href='#' title='删除歌曲'><i class='fa fa-times'></i></a></td>";
            tBody.appendChild(trs);
        }
        audio.src = "res/"+ nameArr[0] +".mp3";
        tBody.firstChild.classList.add("trColor");
        nPlay.innerHTML = "正在播放"+ z +"/"+i;
        songPic.classList.add("revolve");
        audio.addEventListener("canplay", function(){
           monitor()
        })
    })();
    var len=0;
    //获取所有的tr添加点击事件 当点击时播放对应的歌曲
    var songs = document.getElementsByClassName("song");
    for(var i=0;i<songs.length;i++){
        var a = songs[i];
        a.index = i;
        a.onclick = function(){
            //添加歌曲连接
            audio.src = "res/"+ nameArr[this.index] +".mp3";
            //播放
            audio.play();
            //开始监听
            //更换对应的歌曲标题和图片
            songTit.text = arr[this.index][1];
            songPic.src = "imgs/"+imgs[this.index]+".jpg";
            //点击时给对应的行添加高亮显示
            for(var i=0;i<trs.length;i++){
                trs[i].classList.remove("trColor");
            }
            trs[this.index].classList.add("trColor");
            //改变播放按钮样式
            iPlay.className = "fa fa-pause";
            len = this.index;
            nPlay.innerHTML = "正在播放"+ (len+1) +"/"+i;
            songPic.classList.add("revolve");
        };
    }

    //获取音乐时长  监听是否准备好音频,获取时长
    audio.addEventListener("canplay", function(){
        residueTime()
    })
    //改变时长 和进度条
    function residueTime(){
        //获得总时长
        var allTime = audio.duration;
        //获得播放的当前时间
        var nowTime = audio.currentTime;
        //计算剩余时间
        var rem = parseInt(allTime - nowTime);
        //分钟转换
        var minute1 = Math.floor(allTime/60);
        var minute2 = Math.floor(rem/60);
        //秒数转换
        var second1 =  Math.round(allTime%60);
        var second2 =  Math.round(rem%60);
        //进度条
        var len = nowTime/allTime;
        progressBar.style.width = len*545 + "px";
        //显示时长
        if(second1 <10){
            second1 = "0" + second1;
        }
        if(second2 < 10){
            second2 = "0" +second2;
        }
        oddTime.innerHTML = minute1 + ":" + second1;
        songTime.innerHTML = minute2 + ":" + second2;
        return rem;
    }
    var ti;
    //播放时的监听函数
    function monitor(){
        function b(){
            var a = residueTime();
            if(a >= 0){
              ti=setTimeout(b,100);
            }
            if(audio.ended){
                next();
            }
        }
        setTimeout(b,50)
    }
    var mod1 = document.getElementsByClassName("mod1")[0];
    //点击进度条快进退功能
    progress.onclick = function(e){
        e.stopPropagation();
        e = e || window.event;
        var modLen = mod1.offsetLeft;
        //获取鼠标当前点击的x轴坐标距离对象元素最左侧的距离
        var mouseX =  e.pageX;
        var num = mouseX - modLen;
        //设置长度
        progressBar.style.width = num + "px";
        //跳转到歌曲指定的位置
        audio.currentTime = (num/545)* audio.duration;
        var minute1 = Math.floor(num/60);
        var second1 =  Math.round(num%60);
        if(second1 <10){
            second1 = "0" + second1;
        }
        songTime.innerHTNL = minute1 + ":" + second1
    }


    // 播放
    function beginPlay(){
        if(len == 0){
            for(var i=0;i<trs.length;i++){
                trs[i].classList.remove("trColor");
            }
            trs[0].classList.add("trColor");
        }
        if(iPlay.className == "fa fa-play"){
            iPlay.className= "fa fa-pause";
            audio.play();
            songPic.classList.add("revolve");
            audio.addEventListener("canplay", function(){
               monitor()
            })
        }else if(iPlay.className == "fa fa-pause"){
            iPlay.className = "fa fa-play";
            audio.pause();
            songPic.classList.remove("revolve");
        }
    }
    //上一首
    function prevs(){
        //如果是第一首歌曲 暂停 并且将暂停按钮样式更改 否则播放上一首歌曲
        if(len == 0){
            audio.pause();
            iPlay.className= "fa fa-play";
        }else{
            if(iPlay.className= "fa fa-play"){
                iPlay.className= "fa fa-pause";
            }
            audio.src = "res/"+ nameArr[len-1] +".mp3";
            //更换对应的歌曲标题和图片
            songTit.text = arr[len-1][1];
            songPic.src = "imgs/"+imgs[len-1]+".jpg";
            //将对应的歌曲信息高亮显示
            for(var i=0;i<trs.length;i++){
                trs[i].classList.remove("trColor");
            }
            trs[len-1].classList.add("trColor");
            audio.play();
            audio.addEventListener("canplay", function(){
                monitor()
            })
            len -= 1;
            nPlay.innerHTML = "正在播放"+ (len+1) +"/"+i;
        }
    }
    //下一首
    function next(){
        if(len < arr.length){
            if(iPlay.className= "fa fa-play"){
                iPlay.className= "fa fa-pause";
            }
            audio.src = "res/"+ nameArr[len+1] +".mp3";
            //更换对应的歌曲标题和图片
            songTit.text = arr[len+1][1];
            songPic.src = "imgs/"+imgs[len+1]+".jpg";
            //将对应的歌曲信息高亮显示
            for(var i=0;i<trs.length;i++){
                trs[i].classList.remove("trColor");
            }
            trs[len+1].classList.add("trColor");
            audio.play();
            audio.addEventListener("canplay", function(){
                monitor()
            })
            len += 1;
            nPlay.innerHTML = "正在播放"+ (len+1) +"/"+i;
        }else{
            audio.pause();
            iPlay.className= "fa fa-play";
        }
    }
    //删除按钮 点击删除按钮 删除对应的tr 父元素
    var removeds = document.getElementsByClassName("removed");
    for(var i=0;i<removeds.length;i++){
        var a = removeds[i];
        a.index = i;
        a.onclick = function(){
            this.parentNode.parentNode.removeChild(this.parentNode);
        }
    }
    //清空按钮
    function clear(){
        clearTimeout(ti);
        nPlay.innerHTML = "正在播放"+ 0 +"/"+0;
        audio.src = "";
        tBale.style.display = "none";
        tBale.innerHTML = "";
        audio.src = "";
        iPlay.className= "fa fa-play";
        oddTime.innerHTML =0+":"+0+0;
        songTime.innerHTML =0+":"+0+0;
        disEmpty.style.display = "block";
    }


    //循环播放按钮
    function loop(){
        var text = btnMode.className;
        if(text == ""){
            btnMode.classList.add("loop");
            btnMode.innerHTML = "<i class='fa fa-retweet'></i>";
            audio.loop = "loop";
        }else if(text == "loop"){
            btnMode.classList.remove("loop");
            btnMode.innerHTML = "<i class='fa fa-random'></i>";
             audio.loop = "";
        }

    }
    btnMode.onclick = function(){loop()}
    //音量调节
    var btnVolume = document.getElementById("volume");
    var volumeBar = document.getElementsByClassName("volume-bar")[0];
    var volumeCol = document.getElementsByClassName("volume-col")[0];
    function volumed(){
        //根据class名判断是否要改变自身颜色和隐藏音量条
        if(btnVolume.className == ""){
            btnVolume.className = "colBlock";
            //显示音量条
            volumeBar.style.display = "block";
            volumeBar.onclick = function(e){
                //阻止冒泡
                e.stopPropagation();
                e = e || window.event;
                //获取鼠标当前x坐标值
                var mouseX = e.pageX;
                //音量的值就是鼠标当前值减去显示音量值的元素距离页面最左侧的距离
                var num = mouseX - btnVolume.offsetLeft-20;
                volumeCol.style.width = num + "px";
                //将生成的值转换添加为audio的音量值
                audio.volume = (1/60)* num;
            }
        }else{
            btnVolume.classList.remove("colBlock");
            volumeBar.style.display = "none";
        }
    };


    btnPlay.onclick = function(){beginPlay()};
    btnPrev.onclick = function(){prevs()};
    btnNext.onclick = function(){next()};
    btnVolume.onclick = function(){volumed()}
    clearAll.onclick = function(){clear()}
}

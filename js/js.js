function router(w,box){
    box = box || $('.box');
    $.ajax({
        url:"view/"+w+".html",
        type:'get',
        async:true,
        success:function(data){
            box.html(data);
            loadjs(w);
        }
    });
}
function loadjs(w){
    $.ajax({
        url:"js/"+w+".js",
        type:'get',
        async:true
    });
}

var audioID={                   //申明一个对象,用于歌曲的播放方法,与请求歌曲的方式
    play:function(id){          //根据歌曲的id号请求歌曲信息
        $.ajax({
            url:'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid='+id+'',
            type:'get',
            dataType: 'jsonp',
            async:true,
            success:function(data){
                $('.music .left img').attr('src',data.songinfo.pic_small);
                $('.music .left h3').text(data.songinfo.title);
                $('.music .left span').text(data.songinfo.author);
                $('.music .right .btn3').addClass('played').removeClass('paused');
                $('.music audio').attr('src',data.bitrate.file_link).get(0).play();
                $('.play .bot .but .btn3').addClass('played').removeClass('paused');
                $('.play .mid .stick').addClass('rot0').removeClass('rot35');
                $('.play .mid div').addClass('active');

                $('.music').animate({'bottom':0},1000);
                console.log(111)
                //$('.music audio').get(0).muted=true;                             //静音

                setTimeout(function () {                //请求成功后执行歌曲事件进度的效果与歌词同步的效果函数,由于歌曲事件与歌词都为请求
                    songtime();                         //存在时间的延迟性,需要延后执行
                    lrc(songID);
                },800);

                songID=id;
                songinfo=data;
                
            }
        })
    }
};

function txtinit() {
    if(songinfo){
        var data = songinfo;
        $('.play .top .txt h3').text(data.songinfo.title);
        $('.play .top .txt p').text(data.songinfo.author);
        $('.play .mid .face').attr('src',data.songinfo.pic_big);
        fav();                    //执行是否已加入收藏列表
    }
}

function fav() {                        //判断是否已加入收藏列表
    if(localStorage.fav){
        favlist=JSON.parse(localStorage.fav);
        for(var i=0;i<favlist.length;i++){
            if(favlist[i].songinfo.song_id==songID){
                $('.play .xxx').addClass('faved').removeClass('fav');
                $('.play .xxx').children('img').attr('src',"image/faved.png");
            }else {
                $('.play .xxx').addClass('fav').removeClass('faved');
                $('.play .xxx').children('img').attr('src',"image/fav.png");
            }
        }
    }
}

function lrc(songID) {              //歌词请求并且转化数组函数
    $.ajax({
        url:'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry&songid='+songID+'',
        type:'get',
        async:true,
        dataType: 'jsonp',
        success:function(data){
            var text=data.lrcContent;
            var lines = text.split('\n'),       //根据换行间隔,生成数组
                pattern = /\[\d{2}:\d{2}.\d{2}\]/g,         //提取时间部分的正则
                result = [];
            while (!pattern.test(lines[0])) {           //开头部分为空的,去除
                lines = lines.slice(1);
            };
            lines[lines.length - 1].length === 0 && lines.pop();    //数组最后为空的,去除
            lines.forEach(function(v) {
                var time = v.match(pattern),
                    value = v.replace(pattern, '');
                time.forEach(function(v1) {
                    var t = v1.slice(1, -1).split(':');
                    result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
                });
            });
            result.sort(function(a, b) {
                return a[0] - b[0];
            });
            $('.music audio').on('timeupdate',function(){
                var t = $(this).get(0).currentTime;
                for(var i=0;i<result.length;i++){
                    if(t>result[i][0]){
                        $('.play .mid .txt').text(result[i][1])
                    }
                }
            });
        }
    });
}

function songtime() {

    var st=$('.music audio').get(0).duration;                //歌曲的时间总长度
    var sp2 = parseInt(st/60)+':'+parseInt(st%60);
    $('.play .bot .time .sp2').text(sp2);

    $('.music audio').on('timeupdate',function(){                 //时间变化事件
        crt = $(this).get(0).currentTime;                    //歌曲已经播放的时间长度
        var sp1 = parseInt(crt/60)+':'+parseInt(crt%60);
        $('.play .bot .time .sp1').text(sp1);
        $('.play .bot .time .line2').css({'width':100*crt/st+'%'});        //已经播放的歌曲长度与总长的百分比，为进程条的宽度变化比
        $('.music .bot .line').css({'width':100*crt/st+'%'});              //music部分进程条的变化
    });
    
}


var playID=[];        //播放列表的歌曲id号的数组
var playlist=[];      //播放列表歌曲信息的数组
var templist=[];     //临时数组
var songID;         //当前播放歌曲的id号
var songinfo;
var navtime;
var favlist=[];
var crt;

$(document).ready(function () {

    (function(){
        function fontSize(){
            var h = document.getElementsByTagName('html')[0];
            var w = w>750?750:document.documentElement.clientWidth;
            h.style.fontSize=w/3.75+'px';
        }
        fontSize();
        $(window).resize(fontSize);
    })();

    router('start');

});
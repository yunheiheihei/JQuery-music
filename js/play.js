(function () {

    $('.play .top .ser').click(function () {
        router('search');
    });

    $('.play .top .back').click(function (ev) {
        ev.stopPropagation();
        router('playlist');
    });
    
    //localStorage.fav='';

    function playinit() {

        fav();

        txtinit();

        $('.play .xxx').click(function () {                   //fav类的点击事件，收藏夹

            if(!localStorage.fav){
                $(this).addClass('faved').removeClass('fav');
                $(this).children('img').attr('src',"image/faved.png");
                favlist.push(songinfo);
            }
            if(localStorage.fav){
                favlist=JSON.parse(localStorage.fav);
                if($(this).hasClass('fav')){
                    $(this).addClass('faved').removeClass('fav');
                    $(this).children('img').attr('src',"image/faved.png");
                    favlist.push(songinfo);
                }else {
                    $(this).addClass('fav').removeClass('faved');
                    $(this).children('img').attr('src',"image/fav.png");
                    var index=favlist.indexOf(songinfo);
                    favlist.splice(index,1);
                }
            }
            localStorage.fav=JSON.stringify(favlist);
        });


        if($('.music audio').get(0).paused){
            $('.play .mid div').removeClass('active');
            $('.play .mid .stick').addClass('rot35').removeClass('rot0');
            $('.play .bot .but .btn3').removeClass('played');
        }else {
            $('.play .mid div').addClass('active');
            $('.play .mid .stick').addClass('rot0').removeClass('rot35');
            $('.play .bot .but .btn3').removeClass('paused').addClass('played');
        }

        $('.play .bot .but .btn1').click(function (ev) {
            ev.stopPropagation();
            if($('.music audio').get(0).loop){
                $('.music audio').get(0).loop=false;
                $(this).addClass('rep').removeClass('reped');
            }else{
                $('.music audio').get(0).loop=true;
                $(this).addClass('reped').removeClass('rep');
            }

        });

        $('.play .bot .but .btn2').click(function (ev) {
            ev.stopPropagation();
            var n=playID.indexOf(songID);
            if(n>0){
                audioID.play(playID[n-1]);
                $('.playlist li .left').removeClass('active');
                $('.playlist li .right').removeClass('played');
                $('.playlist li').eq(n-1).children('.left').addClass('active');
                $('.playlist li').eq(n-1).children('.right').addClass('played');
                setTimeout(function () {
                    txtinit();
                },800)
            }
        });

        $('.play .bot .but .btn3').click(function (ev) {
            ev.stopPropagation();
            var n=playID.indexOf(songID);
            if($('.music audio').attr('src')){               //判断在audio元素中是否有链接歌曲，避免无歌状态下，按键的错误
                if($(this).hasClass('played')){
                    $('.music audio').get(0).pause();
                    $(this).removeClass('played').addClass('paused');
                    $('.playlist li .left').removeClass('active');
                    $('.playlist li .right').removeClass('played');
                    $('.play .mid div').removeClass('active');
                    $('.play .mid .stick').addClass('rot35').removeClass('rot0');
                    $('.music .btn3').removeClass('played').addClass('paused');
                }else{
                    $('.music audio').get(0).play();
                    $(this).removeClass('paused').addClass('played');
                    $('.playlist li').eq(n).children('.left').addClass('active');
                    $('.playlist li').eq(n).children('.right').addClass('played');
                    $('.play .mid div').addClass('active');
                    $('.play .mid .stick').addClass('rot0').removeClass('rot35');
                    $('.music .btn3').removeClass('paused').addClass('played');
                }
            }else {
                return false;
            }
        });

        $('.play .bot .but .btn4').click(function (ev) {
            ev.stopPropagation();
            var n=playID.indexOf(songID);
            if(n<playID.length-1){
                audioID.play(playID[n+1]);
                $('.playlist li .left').removeClass('active');
                $('.playlist li .right').removeClass('played');
                $('.playlist li').eq(n+1).children('.left').addClass('active');
                $('.playlist li').eq(n+1).children('.right').addClass('played');
                setTimeout(function () {
                    txtinit();
                },800)
            }
        });

        $('.play .bot .but .btn5').click(function (ev) {
            ev.stopPropagation();
            router('playlist');
        });

        function drop() {                                             //点击进程条，改变播放时间
            var w = $('.play .bot .time .line1').css('width');
            w=parseInt(w);                                       //去除w的像素单位
            $('.play .bot .time').click(function (ev) {
                ev.stopPropagation();
                var l = ev.pageX;
                var dis = l/100 - 0.15;                          //css中，左右padding了0.1rem，在15px左右
                dis=parseInt(dis*100)/100;                      //保留两位小数
                if(dis<0){
                    dis=0;
                }
                if(dis>w/100){
                    dis=w/100;
                }
                $('.play .bot .time .line2').css({'width':dis+'rem'});
                var st=$('.music audio').get(0).duration;
                $('.music audio').get(0).currentTime=parseInt(dis*st*100/w);

            });
        }

        drop();

    }

    setTimeout(playinit,800);

})();

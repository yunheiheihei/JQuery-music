(function () {

    $('.music .btn1').click(function (ev) {
        ev.stopPropagation();
        router('playlist');
    });

    $('.music .btn2').click(function (ev) {
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

    $('.music .btn3').click(function (ev) {
        ev.stopPropagation();
        favlist=JSON.parse(localStorage.fav);
        for(var i=0;i<favlist.length;i++){
            if(favlist[i].songinfo.song_id==songID){
                 var m=i;
            }
        }
        var n=playID.indexOf(songID);
        if($('.music audio').attr('src')){               //判断在audio元素中是否有链接歌曲，避免无歌状态下，按键的错误
            if($(this).hasClass('played')){
                $('.music audio').get(0).pause();
                $(this).removeClass('played').addClass('paused');
                $('.playlist li .left').removeClass('active');
                $('.playlist li .right').removeClass('played');
                $('.play .bot .but .btn3').addClass('paused').removeClass('played');
                $('.play .mid .stick').addClass('rot35').removeClass('rot0');
                $('.play .mid div').removeClass('active');
                $('.favorites li .left').removeClass('active');
                $('.favorites li .right').removeClass('played');
            }else{
                $('.music audio').get(0).play();
                $(this).removeClass('paused').addClass('played');
                $('.playlist li').eq(n).children('.left').addClass('active');
                $('.playlist li').eq(n).children('.right').addClass('played');
                $('.play .bot .but .btn3').addClass('played').removeClass('paused');
                $('.play .mid .stick').addClass('rot0').removeClass('rot35');
                $('.play .mid div').addClass('active');
                $('.favorites li').eq(m).children('.left').addClass('active');
                $('.favorites li').eq(m).children('.right').addClass('played');
            }
        }else {
            return false;
        }
    });

    $('.music .btn4').click(function (ev) {
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

    $('.music audio').on('timeupdate',function () {
        if($(this).get(0).ended){
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
            }else {
                $('.music .btn3').removeClass('played').addClass('paused');
                $('.playlist li .left').removeClass('active');
                $('.playlist li .right').removeClass('played');
                $('.play .mid div').removeClass('active');
                $('.play .bot .but .btn3').addClass('paused').removeClass('played');
                $('.play .mid .stick').addClass('rot35').removeClass('rot0');
                $('.music').animate({'bottom':'-0.46rem'},1000);
            }
        }
    });


})();

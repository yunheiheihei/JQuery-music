(function () {

    $('.playlist .top .ser').click(function () {
        router('search');
    });

    $('.playlist .top .back').click(function (ev) {
        ev.stopPropagation();
        router('home');
    });

    function initli() {

        for(var y=0;y<playID.length;y++){           //由于根据id请求回来的歌曲信息延时,顺序不与playID的id次序匹配,所以要排序
             for(var z=0;z<templist.length;z++){
                 if(playID[y]==templist[z].song_id){
                     playlist.push(templist[z]);
                 }
             }
        }
        
        for(var i=0;i<playlist.length;i++){
            $('<li>' +
                    '<span>'+(i+1)+'</span>' +
                    '<div class="pic"><img src="'+playlist[i].pic_big+'"/></div>' +
                    '<div class="left"><img src="image/rage_loading.png"/></div>' +
                    '<div class="mid">' +
                        '<h3>'+playlist[i].title+'</h3>' +
                        '<p>'+playlist[i].author+'</p>' +
                    '</div>' +
                    '<div class="right paused"></div>' +
                    '<div class="del"></div>' +
                '</li>').data('info',playlist[i]).appendTo($('.playlist ul'));
        }

        $('.playlist li').each(function () {
            if($(this).data('info').song_id==songID && $('.music audio').get(0).paused==false){
                $(this).children('.left').addClass('active');
                $(this).children('.right').addClass('played');
            }
        });

        $('.playlist li .right').click(function (ev) {
            ev.stopPropagation();
            var j=$(this).parent().index();
            if($(this).hasClass('played')){
                $('.music audio').get(0).pause();
                $('.music .btn3').removeClass('played').addClass('paused');
                $(this).removeClass('played');
                $('.playlist li .left').removeClass('active');
            }else {
                $('.playlist li .right').removeClass('played');
                $(this).addClass('played');
                $('.playlist li .left').removeClass('active');
                $(this).parent().children('.left').addClass('active');
                audioID.play($('.playlist li').eq(j).data('info').song_id);
            }
        });

        $('.playlist li .del').click(function (ev) {
            ev.stopPropagation();
            var k = $(this).parent().index();
            playID.splice(k,1);
            playlist.splice(k,1);
            $(this).parent().remove();
        });

        $('.playlist li .right').click(function (ev) {
            ev.stopPropagation();
            router('play');
        });

        $('.playlist li').click(function (ev) {
            ev.stopPropagation();
            router('play');
        })
    }

    function songlist() {
        playlist=[];
        templist=[];
        if(playID.length!=0){
            for(var x=0;x<playID.length;x++){
                $.ajax({
                    url:'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid='+playID[x]+'',
                    type:'get',
                    dataType: 'jsonp',
                    async:true,
                    success:function(data){
                        templist.push(data.songinfo);       //请求的文件顺序与playID数组顺序不同,建立临时数组,后序排序
                    }
                });
            }
        }else {
            $('<h2>没有播放列表</h2>').appendTo($('.playlist ul'));
            return false;
        }

        setTimeout(initli,800);           //请求的延迟性，与网络因素有关，增加时间容易读取列表
    }

    songlist();

})();

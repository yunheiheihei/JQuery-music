(function () {

    $('.favorites .top .ser').click(function () {
        router('search');
    });

    function initli() {             //初始化列表

        if(localStorage.fav){               //网络存储为字符型,需要使用JSON的序列化与反序列化,转化存储
            favlist=JSON.parse(localStorage.fav);
            for(var i=0;i<favlist.length;i++){
                $('<li>' +
                    '<span>'+(i+1)+'</span>' +
                    '<div class="pic"><img src="'+favlist[i].songinfo.pic_big+'"/></div>' +
                    '<div class="left"><img src="image/rage_loading.png"/></div>' +
                    '<div class="mid">' +
                    '<h3>'+favlist[i].songinfo.title+'</h3>' +
                    '<p>'+favlist[i].songinfo.author+'</p>' +
                    '</div>' +
                    '<div class="right paused"></div>' +
                    '<div class="del"></div>' +
                    '</li>').data('info',favlist[i].songinfo).appendTo($('.favorites ul'));     //在生成列表时,附加data属性存储每行的歌曲信息
            }
        }else {
            console.log('没有列表') ;
        }
        
        $('.favorites li').each(function () {
            if($(this).data('info').song_id==songID && $('.music audio').get(0).paused==false){         //在初始化列表时,比对正在播放的歌曲的id号
                $(this).children('.left').addClass('active');               //对于匹配的列表行,进行交互效果显示
                $(this).children('.right').addClass('played');
            }
        });

        $('.favorites li .right').click(function (ev) {                 //列表的播放按键,带动的效果与其他模块的效果显示
            ev.stopPropagation();
            var j=$(this).parent().index();
            if($(this).hasClass('played')){
                $('.music audio').get(0).pause();
                $('.music .btn3').removeClass('played').addClass('paused');
                $(this).removeClass('played');
                $('.favorites li .left').removeClass('active');
            }else {
                $('.favorites li .right').removeClass('played');
                $(this).addClass('played');
                $('.favorites li .left').removeClass('active');
                $(this).parent().children('.left').addClass('active');
                audioID.play($('.favorites li').eq(j).data('info').song_id);
            }
        });

        $('.favorites li .del').click(function (ev) {           //删除按键,删除列表中显示的行,并删除在网络存储中的数据
            ev.stopPropagation();
            var k = $(this).parent().index();
            favlist=JSON.parse(localStorage.fav);
            favlist.splice(k,1);
            localStorage.fav=JSON.stringify(favlist);
            $(this).parent().remove();
        });

        $('.favorites li .right').click(function (ev) {
            ev.stopPropagation();
            router('play');
        });

        $('.favorites li').click(function (ev) {
            ev.stopPropagation();
            router('play');
        })
    }

    initli();

})();

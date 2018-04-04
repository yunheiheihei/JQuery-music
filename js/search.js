(function () {

    $('.search .top span').click(function () {
        router('home');
    });

    $('.search .top input').keyup(function () {
        if ($(this).val()){
            var name = $(this).val();
            $('.search .mid').empty();
            searchlist(name);
        }
    });
    
    function searchlist(name) {
        $.ajax({
            url:'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug&query='+name+'',
            type:'get',
            dataType: 'jsonp',
            async:true,
            success:function (data) {
                if(data.error_message!='failed'){
                    var list = data.song;
                    $('<ul>').appendTo($('.search .mid'));
                    for(var i=0;i<list.length;i++){
                        $('<li><a>'+list[i].songname+'</a></li>').data('info',list[i]).appendTo($('.search .mid ul'));
                    }
                }
                $('.search li').click(function () {
                    if(playID.indexOf($(this).data('info').songid)==-1){
                        playID.unshift($(this).data('info').songid);
                    }
                    audioID.play($(this).data('info').songid);
                })
            }
        })
    }
    
})();
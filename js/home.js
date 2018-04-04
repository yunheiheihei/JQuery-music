(function () {

    $('.home .top .ser').eq(0).click(function () {
        router('search');
    });
    
    $('.home li').click(function () {
        playID=[];
        var type=$(this).data('type');
        songtype(type);
        setTimeout(function () {                //请求的延迟性，增加切换的时间
            router('playlist');
        },300)
    });

    function songtype(type) {
        $.ajax({
            url:'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type='+type+'&size=10&offset=0',
            type:'get',
            dataType: 'jsonp',
            async:true,
            success:function (data) {
                var arr = data.song_list;
                for(var i=0;i<arr.length;i++){
                    playID.push(arr[i].song_id);
                }
            }
        })
    }

})();

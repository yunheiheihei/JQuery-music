(function () {



    (function (){
        $('.nav li').click(function(ev){
            ev.stopPropagation();
            $(this).addClass('active').siblings().removeClass('active');
        });
        $('.nav .Home').click(function (ev) {
            ev.stopPropagation();
            router('home');
            $('.nav ul').animate({'right':'-1.5rem'},300);
            clearTimeout(navtime);
        });
        $('.nav .PlayList').click(function (ev) {
            ev.stopPropagation();
            router('playlist');
            $('.nav ul').animate({'right':'-1.5rem'},300);
            clearTimeout(navtime);
        });
        $('.nav .Play').click(function (ev) {
            ev.stopPropagation();
            router('play');
            $('.nav ul').animate({'right':'-1.5rem'},300);
            clearTimeout(navtime);
        });
        $('.nav .Favorites').click(function (ev) {
            ev.stopPropagation();
            router('favorites');
            $('.nav ul').animate({'right':'-1.5rem'},300);
            clearTimeout(navtime);
        });
    })();

    (function () {
        $('.nav ul').animate({'right':'-1.5rem'},0);

        $('.nav div').click(function (ev) {
            ev.stopPropagation();
            $('.nav ul').animate({'right':'0rem'},300,function () {
                clearTimeout(navtime);
                navtime=setTimeout(function () {
                   $('.nav ul').animate({'right':'-1.5rem'},300);
                },3000)
            });
        });
        $('html').click(function () {
            $('.nav ul').animate({'right':'-1.5rem'},300);
        })

    })();

})();

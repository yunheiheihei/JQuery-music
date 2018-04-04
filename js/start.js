(function () {

    (function () {
        var canvas = document.getElementById('canvas');
        var cvs =canvas.getContext('2d');
        var x = canvas.width/2;
        var y = canvas.height/2;
        var r = 50;
        var max = 400;
        var n=0;
        var start = Math.PI*3/2/max;
        var time;
        clearInterval(time);
        time = setInterval(function(){
            cvs.clearRect(0,0,canvas.width,canvas.height);
            cvs.beginPath();
            cvs.lineWidth = 8;
            cvs.strokeStyle = 'rgba(12,108,251,0.5)';
            cvs.lineCap = 'round';
            cvs.arc(x,y,r,(Math.PI*7/4),(start*n));
            cvs.shadowOffsetX = 12;
            cvs.shadowOffsetY = 12;
            cvs.shadowBlur = 12;
            cvs.shadowColor = 'rgba(0, 0, 0, 0.5)';
            cvs.stroke();
            n++;
            if(n>=max){
                clearInterval(time);
                setTimeout(function () {
                   router('home');
                   router('nav',$('.nav'));
                   router('music',$('.music'));
                },800)
            }
        },10);
    })();

    (function spanAn() {
        $('.start h3').animate({'opacity':1},2000);
        $('.start p').delay(1000).animate({'opacity':1},2000,function () {
            $('.start span').css({'opacity':0});
            $('.start span').eq(0).animate({'opacity':1},800,function () {
                $('.start span').eq(1).animate({'opacity':1},800,function () {
                    $('.start span').eq(2).animate({'opacity':1},800,function () {
                        $('.start span').animate({'opacity':0},800);
                        setTimeout(spanAn,500);
                    })
                })
            });
        });
    })();

   




    

})();



$(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
        setTimeout(function () {
            $('.closed').click(function () {
                $('.newsletter').removeClass('showup');
                localStorage.setItem('keepNewsletter', true);

                var duration = 10*60*1000;
                setTimeout(function () {      
                    localStorage.removeItem('keepNewsletter', true);
                }, duration);
            });

            if (localStorage.getItem('keepNewsletter', true)) {
                $('.newsletter').removeClass('showup');
            } else {
                $('.newsletter').addClass('showup');
            }
        }, 250);
    }    
});

$(function () {
    $('.gotit').click(function () {
        var height = $(".notification").height();
        $('.notice-wrapper').animate({
            'margin-top' : '-' + height,
            'opacity' : '0',
        }, 250);
    });
});
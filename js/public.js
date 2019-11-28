/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2019, Ginkgo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */
 
$(function() {
    console.log($('#about').offset().top)
    console.log($('#about').height());

    // mobile nanzhuang slider
    $('.nanzhuang-mobile-select').click(function(){
        $('.nanzhuang-mobile-menu').slideToggle('slow');
    })

    $('.menu-item').click(nanzhuang);

    $('.icon-chevron-left, .icon-chevron-right').click(slider);

    $('.special-sub').click(special);

    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault()
        
        $('.menu').find('li').removeClass('active');

        $(this).parent().addClass('active')

        $('html, body').animate(
          {
            scrollTop: $($(this).attr('href')).offset().top,
          },
          500,
          'linear'
        )
    })

    $('.menu-open').click(function(){
        $('.mobile-menu-bg').fadeIn();
    })
    $('.menu-close').click(function(){
        $('.mobile-menu-bg').fadeOut();
    })
    $('.mobile-menu-item').click(function() {
        $('.mobile-menu-bg').fadeOut();
    })
    $('.top-btn').click(function() {
        $('html,body').animate({ scrollTop: 0 }, 'slow');   /* 返回到最頂上 */
        return false;
    })

    let sectionIds = {};
        $(".section").each(function () {
            var $this = $(this);
            sectionIds[$this.attr("id")] = $this.first().offset().top;
        });
    $(window).scroll(function() {
        paraScroll();
        showGoTop();
        fadeIn();
        scrollMenu(sectionIds);
    });
});

function nanzhuang () {
    let $item = $(this).attr("data-item");
    let $name = $(this).text();
    let $type = $(this).attr('data-type');

    if($type === 'mobile') {
        $('.nanzhuang-mobile-menu').slideToggle('slow');
        $('.nanzhuang-mobile-select').text($name);
    } else {
        $('.menu-item').removeClass('active');
        $(this).addClass('active');
    }
    
    $('.slider-item').removeClass('active').hide();
    $('.slider-item-' + $item).addClass('active').fadeIn('slow');
}

function special () {
    let $item = $(this).attr('data-item');
    $('.special-main').attr('src', 'img/special-main0'+$item+'.png');
    $('.special-sub').removeClass('active');
    $(this).addClass('active');
    $('.special-info').removeClass('active').hide();
    $('.special-info-' + $item).addClass('active').fadeIn();
    
}

function slider () {
    let $arrow = $(this).attr('class');
    let $item = $('.menu-item.active').attr("data-item");
    if ($arrow === 'icon-chevron-right') {
        if (++$item == 4) {
            $item = 1;
        }
    } else {
        if (--$item == 0) {
            $item = 3;
        }
    }

    $('.menu-item').removeClass('active');
    $('.menu-item-' + $item).addClass('active');
    $('.slider-item').removeClass('active').hide();
    $('.slider-item-' + $item).fadeIn('slow');
}

function paraScroll () {
    var pra1 = $(this).scrollTop() / - 25;
    var pra2 = $(this).scrollTop() / - 10;
    $(".blueprint-stick").css({
        "transform" : "translate3d(0px, " + pra1  + "%, .01px)", 
        "-webkit-transform" : "translate3d(0px, " + pra1  + "%, .01px)",
        "-moz-transform" : "translate3d(0px, " + pra1  + "%, .01px)",
        "-khtml-transform" : "translate3d(0px, " + pra1  + "%, .01px)",
        "-ms-transform" : "translate3d(0px, " + pra1  + "%, .01px)",
        "-o-transform" : "translate3d(0px, " + pra1  + "%, .01px)"
    });
}

function showGoTop () {
    if ( $(this).scrollTop() > 400){
        $('.top-btn').fadeIn();
    } else {
        $('.top-btn').fadeOut();
    }
}

function fadeIn() {
    if($(this).scrollTop() > parseInt($('.blueprint').offset().top)) {
        $('.blueprint-cards-item').addClass('fade-in');
    }
}

function scrollMenu(sectionIds) {
    $(window).scroll(function (event) {
        var scrolled = $(this).scrollTop();
        for (key in sectionIds) {
            if (scrolled >= sectionIds[key]) {
                $('.menu').find('li').removeClass('active');
                var c = $("[data-id=" + key + "]");
                c.addClass("active");
            }
        }
    });
}
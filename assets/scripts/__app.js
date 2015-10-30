;( function( $ ) {
	"use strict";

	var body = $('body');

	$.app = {
		
		initSlider: function()
		{
			if (!is_undefined($.fn.slick))
			{
				if ($('#page-slider').length && $('#page-slider').find('.slider__item').length)
				{
					$('#page-slider').slick({
						infinite: true,
						draggable: false,
						dots: true,
						speed: 700,
						fade: true,
						autoplay: true,
						pauseOnHover: false,
						autoplaySpeed: 4500,
						slidesToShow: 1,
						cssEase: 'ease',
						prevArrow: '<button type="button" class="slider__navigation slider__navigation_prev slick-prev"></button>',
						nextArrow: '<button type="button" class="slider__navigation slider__navigation_next slick-next"></button>'
					});
				}
			}

			if ($('#carousel').length > 0 && $('#carousel').find('.carousel__item').length >= 4)
			{
				var $carouselSlider = $('#carousel');
				
				$carouselSlider.removeClass('carousel__list_none');

				$carouselSlider.slick({
					infinite: true,
					draggable: false,
					speed: 300,
					slidesToShow: 4,
					slidesToScroll: 1,
					cssEase: 'linear',
					prevArrow: '<button type="button" class="carousel__navigation carousel__navigation_prev slick-prev"></button>',
					nextArrow: '<button type="button" class="carousel__navigation carousel__navigation_next slick-next"></button>'
				});
			}
		},
		
		initSelect: function()
		{
			$('select').selectbox();
		},

		initMask: function()
		{
			$(".watch-datemask").mask("99/99/9999");
			$(".watch-phonemask").mask("+ 7 (999) 999-99-99");
			$(".watch-cartnumber").mask("999-999-999");
		},

		initFancyBox: function()
		{
			if (!is_undefined($.fn.fancybox))
			{
				$('.fancybox').fancybox({
					helpers: {
						overlay: {
						  locked: false
						}
					}
				});

				$('.fancybox-media').fancybox({
					openEffect  : 'none',
					closeEffect : 'none',
					helpers : {
						media : {},
						overlay: {
						  locked: false
						}
					}
				});

				$(".various").fancybox({
					maxWidth	: 800,
					maxHeight	: 600,
					fitToView	: false,
					width		: '70%',
					height		: '70%',
					autoSize	: false,
					closeClick	: false,
					openEffect	: 'none',
					closeEffect	: 'none',
					helpers: {
						overlay: {
						  locked: false
						}
					}
				});
			}
		},

		initAjaxForm: function()
		{
			this.ajaxForm.init();
		},

		initPopup: function()
		{
			var that = this;
			
			$.popup.init('.js-open-popup', {
				cssPosition: false,
				wrapper: '.layout-wrapper'
			});

			body.on('popup.after_open', function(e, popup){
				that.magnification.init();
			});

			this.product.initPopup();
		},

		init: function()
		{
			this.initSlider();
			this.initPopup();
			this.initMask();
			this.initSelect();
			this.initFancyBox();
		}

	};

})( jQuery );
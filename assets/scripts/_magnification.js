;( function( $ ) {
	"use strict";
	
	var body = $('body'), that;

	$.app.magnification = {
		init: function()
		{
			var preloader = '';
			
			if ($('#tmpl_preloader').length > 0)
			{
				preloader = tmpl('tmpl_preloader');
			}

			var magnification = $('#magnification').offset();

			$('#magnification').on('mouseenter', function(e){
				$(this).addClass('active');
			});

			$('#magnification').on('mouseleave', function(e){
				$(this).removeClass('active');
			});

			var pointer = document.getElementById('magnification-pointer'), isie = false;

			if ($('html').hasClass('lt-ie9'))
			{
				isie = true;
			}

			$('#magnification').on('mousemove', function(e){
				var x = e.pageX - magnification.left + 5;
				var y = e.pageY - magnification.top + 5;

				if (isie)
				{
					$(pointer).css({
						'left': x, 'top': y
					});
				}
				else
				{
					$(pointer).css({
						'transform': 'translate3d(' + x + 'px, '+ y + 'px, 0)'
					});
				}
			});

			$('#zoom-image').on('click', '.cloudzoom', function(e){
				e.preventDefault();
				
				zoomStart($(this), $(this).attr('src'), $(this).data('large'));
				
				return !1;
			});

			function zoomStart(element, image, large)
			{
			    var options = {
			        'zoomWidth': '427px',
			        'zoomHeight': '646px',
			        'tintOpacity': 0,
			        'smoothMove': 1
			    };
			    
			    var myInstance = new CloudZoom($(element), options);
			    myInstance.loadImage(image, large);

			    //myInstance.destroy();
			}

			body.on('click', '.magnification-trigger', function(e){
			   	e.preventDefault();

				var wrapper = '#zoom-image';

				if ($(this).data('wrapper'))
				{
					wrapper = $(this).data('wrapper');
				}

				$(wrapper).html(preloader);

				var image = $(this).attr('href'),
					large = image;
			
			    var img = document.createElement('img');
			    	img.src = image;

		    	if ($(this).data('zoom'))
			    {
			        large = $(this).data('zoom');
			    }

			    $(img).imageLoad(function(){
			    	if ($(wrapper).length > 0)
				    {
				    	$image = $(tmpl('tmpl_imglarge', {"large": large, "image": image}));
				        $(wrapper).html($image);

				        setTimeout(function(){
				        	$image.addClass('product-item__zimage_active');
				        },10);
				    }
				});
			});

			body.on('click', '.js-magnifier', function(e){
				e.preventDefault();

				zoom('#zoom-image');

				return !1;
			});
		}
	};

})( jQuery );
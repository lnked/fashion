;( function( $ ){
	"use strict";

	var body = $('body'), control, container, preview, timer, preloader, popup;
	
	$.app.product = {
		
		loadProduct: function(id)
		{
			var _this = this;

			$.app.ajaxForm.send(
				window.load_product_url,
				'get',
				{
					id: id
				},
				function(response)
				{
					if (response.hasOwnProperty('status') && response.status === true)
					{
						window.location.hash = 'product-' + id;

						popup = $(template('tmpl-popup-product', response));
						popup.addClass('temp');

						body.append(popup);

						$.popup.open('#tmpl_product_item', true, false);

						popup.find('.js-open-product').on('click', function(e){
							e.preventDefault();

							$('.popup.is-open').remove();

							var tmp = window.location.hash.substr(1).split('-');

							_this.loadProduct(parseInt($(this).data('productid')), true, false);
						
							return false;
						});
					}
				}
			);
		},

		initPopup: function()
		{
			var _this = this;

			if (window.location.hash.length)
			{
				if (window.location.hash.substr(1).length)
				{
					var tmp = window.location.hash.substr(1).split('-');

					if (!is_undefined(tmp[0]) && !is_undefined(tmp[1]) && tmp[0] == 'product')
					{
						_this.loadProduct(parseInt(tmp[1]), true, false);
					}
				}
			}

			body.on('click', '.js-select-item', function(e){
				e.preventDefault ? e.preventDefault() : e.returnValue = false;

				$(this).closest('.js-select-wrap').find('.current').removeClass('current');
				$(this).addClass('current');

				var preview = $(this).attr('href'), large = $(this).data('zoom');

				$('#zoom-image').html(
					template('tmpl-zoom-image', { 'preview': preview, 'large': large })
				);
				
			});

			body.on('click', '.js-open-product', function(e){
	            e.preventDefault ? e.preventDefault() : e.returnValue = false;
	            
	            if ($(this).data('productid'))
	            {
	            	if ($(this).hasClass('js-product-navigation'))
		            {
		            	$.popup.close($('.popup.is-open.temp'));

		            	$('body').on('popup.after_close', function(e, popup){
		            		_this.loadProduct(parseInt($(this).data('productid')));	

		            		$('body').off('popup.after_close');
		            	});
		            }
		            else
		            {
		            	_this.loadProduct(parseInt($(this).data('productid')));
		            }
		        }
			});

		}

	};

})( jQuery );
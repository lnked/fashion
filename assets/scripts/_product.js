;( function( $ ){
	"use strict";

	var body = $('body'), control, container, preview, timer, preloader, popup;
	
	$.app.product = {
		
		loadProduct: function(id, _overlay, _bodyclass)
		{
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

						$.popup.open('#tmpl_product_item', _overlay, _bodyclass);
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

			body.on('click', '.js-open-product', function(e){
	            e.preventDefault ? e.preventDefault() : e.returnValue = false;
	            
	            if ($(this).data('productid'))
	            {
	            	var bodyclass = false, overlay = true;

	            	if (typeof($(this).data('bodyclass')) !== 'undefined')
					{
						bodyclass = $(this).data('bodyclass');
					}

					if (typeof($(this).data('overlay')) !== 'undefined')
					{
						overlay = $(this).data('overlay');
					}

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
		            	_this.loadProduct(parseInt($(this).data('productid')), overlay, bodyclass);	
		            }
		        }
			});

		}

	};

})( jQuery );
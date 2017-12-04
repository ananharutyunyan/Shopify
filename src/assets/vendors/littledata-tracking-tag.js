
			(function(){
				var loadScript = function(url, callback){
			    var script = document.createElement("script")
			    script.type = "text/javascript";
			 
			    if (script.readyState){  //IE
			        script.onreadystatechange = function(){
			            if (script.readyState == "loaded" ||
			                    script.readyState == "complete"){
			                script.onreadystatechange = null;
			                callback();
			            }
			        };
			    } else {  //Others
			        script.onload = function(){
			            callback();
			        };
			    }
			 
			    script.src = url;
			    document.getElementsByTagName("head")[0].appendChild(script);
			}
			var ldTracker = function(jQuery){
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

				ga('create', 'UA-49021686-1', 'auto', {name : 'littledata'});
				
				ga('littledata.require','ec');

				jQuery(document).ready(function(){
					var referralExclusion = /(checkout\.shopify\.com|paypal\.com)/
					if ( referralExclusion.test(document.referrer) ) ga('littledata.set','referrer',null)

					if(LittledataLayer && LittledataLayer.ecommerce && LittledataLayer.ecommerce.impressions){
						var locationArr = location.pathname.split('/');
						var offsetSize = locationArr[locationArr.length-1] === "" ? 3 : 2;
						if(locationArr[locationArr.length - offsetSize] == 'collections')
								listViewScript();
						else if(locationArr[locationArr.length - offsetSize] ==  'products') 
								productPageScript();
						else if(locationArr[1] == 'cart')
								cartPageScript();
					}

					ga('littledata.send', 'pageview')
				})

				function listViewScript(){
					LittledataLayer.ecommerce.impressions.forEach(function(product,index){
						ga('littledata.ec:addImpression', product)
					})
					ga('littledata.send', 'event', 'Ecommerce', 'Impressions', location.pathname, 0,{
						hitCallback: function() {
					    }
					});
					//product list clicks
					jQuery('a')
						.filter(function(){ return this.href.indexOf('/products') !== -1}) //only add event to products
						.click(function(ev){
							ev.preventDefault();
							var self = this;
							var clickedProductDetails = LittledataLayer.ecommerce.impressions.filter(function(product){
								var linkSplit = self.href.split('/products/')
								var productLink = linkSplit && linkSplit[1]
								return productLink == product.handle
							})[0];
							if (clickedProductDetails) {
								//only wait 1 second before redirecting
								self.timeout = window.setTimeout(function(){
									document.location = self.href;
								},1000)
								ga('littledata.ec:addProduct', clickedProductDetails);
								ga('littledata.ec:setAction', 'click', {list: location.pathname});
								// Send click with an event, then send user to product page.
								ga('littledata.send', 'event', 'Ecommerce', 'Product list click', String(clickedProductDetails.id), clickedProductDetails.price , {
									hitCallback: function() {
									  window.clearTimeout(self.timeout)
								      document.location = self.href;
								    }
								});
							}
							else document.location = self.href;
						})
				}

				function productPageScript(){
					var product = LittledataLayer.ecommerce.impressions[0]
					if(!product) return;
					ga('littledata.ec:addImpression', product)

					ga('littledata.ec:setAction', 'detail');
					ga('littledata.send', 'event', 'Ecommerce', 'Detail View', String(product.id), product.price);

					jQuery('form[action="/cart/add"] [type="submit"]').click(function(ev){
						ev.preventDefault()
						ga('littledata.ec:addProduct', product)

						ga('littledata.ec:setAction', 'add');
						ga('littledata.send', 'event', 'Ecommerce', 'Add to cart', product.id, product.price);

						cartPageScript(function(){
							jQuery('form[action="/cart/add"]').submit()
						})
					})
				}

				function cartPageScript(cb){
					ga(function() {
					   var clientID = ga.getByName('littledata').get('clientId');
						jQuery.get('/cart.json',function(cart){
							jQuery.post('https://transactions.littledata.io/clientID', {
								clientID : clientID,
								cartID : cart.token 
							}, function(){
								if(cb)
									cb()
							})
						})
					});
				}
			}


			if(typeof jQuery === 'undefined'){
				loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function(){
				    jQuery191 = jQuery.noConflict(true);
				    ldTracker(jQuery191);
				  });
				} else {
				  ldTracker(jQuery);
				}
			})()
			
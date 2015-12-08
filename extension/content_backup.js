InboxSDK.load('1', 'sdk_shopify-gmail_140b202e46').then(function(sdk){

	//All Orders
	var routeID = 'ShopifyForGmail/orders';
	
	sdk.Router.handleCustomRoute(routeID, function(customRouteView){
		function getOrders() {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "http://localhost:3000/orders", true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					// JSON.parse does not evaluate the attacker's scripts.
					customRouteView.getElement().innerHTML = xhr.responseText;
				}
			}
			xhr.send();
			
			$( "tr" ).click(function() {
			  alert( "Handler for .click() called." );
			});
		}
		getOrders();
	});
	
	sdk.NavMenu.addNavItem({
		name: 'Shopify Orders',
		routeID: routeID
	});

	//Specific Order
	var orderRouteID = 'ShopifyForGmail/orders/:order'
	
	sdk.Router.handleCustomRoute(orderRouteID, function(orderRouteView){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:3000/orders/" + orderRouteView.getParams().order, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				// JSON.parse does not evaluate the attacker's scripts.
				orderRouteView.getElement().innerHTML = xhr.responseText;
			}
		}
		xhr.send();
	});

		sdk.NavMenu.addNavItem({
			name: 'Order',
			routeID: orderRouteID,
			routeParams: {order: ':order'}
		});
		
});

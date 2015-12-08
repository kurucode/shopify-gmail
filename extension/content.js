
var shopifyServer = "http://localhost:3000/";

var header = "<div style='display:inline'><a id='refreshList'><img src='"+chrome.runtime.getURL("images/refresh.png")+"'/></a> <h3>Shopify Orders</h3></div><div class='load-icon'></div>";

function retreiveOrderList()
{
    var JSONdata = $.ajax({
			type : "GET",
			url : shopifyServer + "orders.json",
			cache : false,
			dataType: "json",			// Use when retrieving
			crossDomain: true,
	
			success: function(data) {
				var i;
				var out = header;
				out += "<table class='F cf zt'>";
				out += '<tbody>';
				for(i = 0; i < data.length; i++) {
					var ffstatus = data[i].fulfillment_status; 
					if(ffstatus.length) { 
						ffstatus = ffstatus; 
					}
					else { 
						ffstatus = "unfulfilled"; 
					};
					var pstatus = data[i].financial_status;
					if( pstatus == "partially_refunded") { 
						pstatus = "partially refunded";
					} else if (pstatus == "partially_paid") { 
						pstatus = "partially paid"; 
					} else { pstatus = pstatus; };
					
					out += "<tr id="+ data[i].id +" class='zA yO shopify " + ffstatus + "'>" +
								"<td class='xY yX inboxsdk__resultsSection_result_title' width='20%'>" +
									"<div><div class='zF'>#" + data[i].order_number + "</div><div>"+data[i].created_at +"</span></div>" +
								"</td>" +
								"<td class='xY'>" +
									"<div class='V3'>" +
										"<div class='p-status " + pstatus + "'>" + pstatus + "</div>"+
										"<div class='f-status " + ffstatus + "'>" + ffstatus + "</div>" + 
										"<span class='name'>" + data[i].name +"</span>" +
									"</div>" +
								"</td>" +
								"<td class='xY xW'><span>" + data[i].price + "</span></td>" +
							"</tr></a>";
				}
				out += "</tbody>";
				out += "</table>" + 
				       "<div >" + 
				       "<div id='order_content'class='order-content'></div></div>";
				
				$(".inboxsdk__custom_view_element").html(out);
			},
			error: function (xhr, ajaxOptions, thrownError) { 
				//Add these parameters to display the required response
				console.log( 'xhr.status: ' + xhr.status );
				console.log( 'thrownError: ' + thrownError );
			},
			complete: function (xhr) {
			    // hide loading image
			    $(".load-icon").css("display", "none");
			}
		});
}

$(document).on('click','#refreshList', function(e){
    // hide prev content and show loading image
    $(".inboxsdk__custom_view_element table").css("display", "none");
    $(".load-icon").css("display", "block");
    retreiveOrderList();
});

InboxSDK.load('1', 'sdk_shopify-gmail_140b202e46').then(function(sdk){
	//All Orders
	var routeID = 'ShopifyForGmail/orders';
	
	//Specific Order
	var orderRouteID = 'ShopifyForGmail/orders/:order'
	
	sdk.Router.handleCustomRoute(routeID, function(customRouteView) {
		
		// display loading image
		customRouteView.getElement().innerHTML = header;
		$(".load-icon").css("display", "block");
		
		var JSONdata = $.ajax({
			type : "GET",
			url : shopifyServer + "orders.json",
			cache : false,
			dataType: "json",			// Use when retrieving
			crossDomain: true,
	
			success: function(data) {
			    		
				var i;
				var out = header;
				out += "<table class='F cf zt'>";
				out += '<tbody>';
				for(i = 0; i < data.length; i++) {
					var ffstatus = data[i].fulfillment_status; 
					if(ffstatus.length) { 
						ffstatus = ffstatus; 
					}
					else { 
						ffstatus = "unfulfilled"; 
					};
					var pstatus = data[i].financial_status;
					if( pstatus == "partially_refunded") { 
						pstatus = "partially refunded";
					} else if (pstatus == "partially_paid") { 
						pstatus = "partially paid"; 
					} else { pstatus = pstatus; };
					var routeParam = {order: data[i].id};
					var link = sdk.Router.createLink(orderRouteID, routeParam);
					out += "<tr id="+ data[i].id +" class='zA yO shopify " + ffstatus + "'>" +
								"<td class='xY yX inboxsdk__resultsSection_result_title' width='20%'>" +
									"<div><div class='zF'>#" + data[i].order_number + "</div><div>"+data[i].created_at +"</span></div>" +
								"</td>" +
								"<td class='xY'>" +
									"<div class='V3'>" +
										"<div class='p-status " + pstatus + "'>" + pstatus + "</div>"+
										"<div class='f-status " + ffstatus + "'>" + ffstatus + "</div>" + 
										"<span class='name'>" + data[i].name +"</span>" +
									"</div>" +
								"</td>" +
								"<td class='xY xW'><span>" + data[i].price + "</span></td>" +
							"</tr></a>";
				}
				out += "</tbody>";
				out += "</table>";

				
				customRouteView.getElement().innerHTML = out;
				$( document ).on( 'click', ".shopify", function(e) {
				    var order_id = $(this).attr("id");
				    var routeParam = {order: order_id};
			        sdk.Router.goto(orderRouteID, routeParam);
				});
			},
			error: function (xhr, ajaxOptions, thrownError) { 
				//Add these parameters to display the required response
				console.log( 'xhr.status: ' + xhr.status );
				console.log( 'thrownError: ' + thrownError );
			},
			complete: function (xhr) {
			}
		});
	});
	
	sdk.NavMenu.addNavItem({
		name: 'Shopify Orders',
		routeID: routeID,
		iconUrl: chrome.runtime.getURL('images/menu-ico.ico')
	});
	
	sdk.Router.handleCustomRoute(orderRouteID, function(orderRouteView){

		var JSONdata = $.ajax({
			type : "GET",
			url : shopifyServer + "orders/"+ orderRouteView.getParams().order +".json",
			cache : false,
			headers: {"Content-Encoding": "gzip"},
			dataType: "html",			// Use when retrieving
			crossDomain: true,
	
			success: function(data) {
			    var header = "<div style='display:inline'>" +
			    "<div id='backList' class='T-I J-J5-Ji lS T-I-ax7 ar7'>" +
			    "<div class='ar6 T-I-J3 J-J5-Ji'></div></div>" +
			    "<h3>Shopify Order Detail</h3></div>";
			    data = header + data;
				orderRouteView.getElement().innerHTML = data;
				$( document ).on( 'click', "#backList", function(e) {
			        sdk.Router.goto(routeID);
				});
			},
			error: function (xhr, ajaxOptions, thrownError) { 
				//Add these parameters to display the required response
				console.log( 'xhr.status: ' + xhr.status );
				console.log( 'thrownError: ' + thrownError );
			},
			complete: function (xhr) {
			}
		});
		
	});
});

class ExtensionController < ApplicationController
  layout 'extension'
  
  around_filter :shopify_session

  def orders
    @orders = ShopifyAPI::Order.find(:all, params: {limit: 50})
    
    respond_to do |format|
      format.json
    end
    
  end
  
  def orders_show
    @order_show = ShopifyAPI::Order.find(params[:id])
    
    respond_to do |format|
      format.json
    end
    
  end

end

ShopifyApp.configure do |config|
  #config.api_key = ENV['SHOPIFY_CLIENT_API_KEY']
  config.api_key = "b5963a0a59428ae169feac3a8e2eceb8"
  #config.secret = ENV['SHOPIFY_CLIENT_API_SECRET']
  config.secret = "ba769948765469ed0af35711d1dcdae1"
  config.scope = 'read_customers, read_orders, write_products'
  config.embedded_app = true
  config.routes = false
end

# Shopify for Gmail App and Extension

The Shopify for Gmail app connects to a shop so users can manage their shop orders through Gmail.

It uses Ruby on Rails as a backend framework and the JavaScript based Shopify Embedded API.

The Gmail extension uses InboxSDK (www.inboxsdk.com) and lives under the /extension directory.

# Setting up

### App

Download the files

Install the gems:

    bundle install

Run the server:

    bundle exec rails server

To install the application on your dev-shop go to:

    http://localhost:3000/login?shop=<yourdevshop-url.myshopify.com>

You will be prompted to install the application and will be redirected to the embedded Shopify environment once installed.

### Extension

Go to Chrome extensions and enable developer mode.

Load the extension located in the /extension directory. Every time you change the extension code you have to reload it in the extension menu and refresh the gmail tab.

# Mixed Content Restrictions

When developing locally, you have to enable mixed content both inside the dev shop and Gmail.

# Documentations

http://docs.shopify.com/embedded-app-sdk
http://inboxsdk.com
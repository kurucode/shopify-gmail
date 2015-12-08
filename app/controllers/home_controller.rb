class HomeController < ApplicationController
  layout 'embedded_app'
  
  around_filter :shopify_session
  
  def index
  end

  def modal
  end

  def modal_buttons
  end

  def regular_app_page
  end

  def buttons
  end

  def help
  end
  
  def emails
    if request.post?
      if params[:email].present? and params[:name].present?
        flash[:notice] = "#{ params[:name] } (#{ params[:email] }) will now be able to manage orders through Gmail."
      else
        flash[:error] = "Name and email must be set."
      end
    end
  end
  
  def error
    raise "An error page"
  end

  def form_page
    if request.post?
      if params[:name].present?
        flash[:notice] = "Created #{ params[:colour] } unicorn: #{ params[:name] }."
      else
        flash[:error] = "Name must be set."
      end
    end
  end

  def pagination
    @total_pages = 3
    @page = (params[:page].presence || 1).to_i
    @previous_page = "/pagination?page=#{ @page - 1 }" if @page > 1
    @next_page = "/pagination?page=#{ @page + 1 }" if @page < @total_pages
  end

end

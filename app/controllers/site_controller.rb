class SiteController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: [:search]

  def index
  end

  def search
    term = params[:term]
    results = []
    [1,2].each do |index|
      url = "http://www.recipepuppy.com/api/?q=#{term}&p=#{index}"
      response = HTTParty.get(url)
      json = JSON.parse(response.parsed_response)
      results.push(*json["results"])
    end
    render json: results.first(20)
  end
end

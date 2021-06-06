module Api
  module V1
    class HoldingsController < ApplicationController
      def index
        user = User.find(params[:user_id])
        holdings = user.holdings

        t = holdings[0][:ticker]
        @url = Stock.find_by(ticker: t)[:url]

        column_is_empty = Holding.find_by(ticker: 'aapl')[:company_name].empty?

        if column_is_empty
          get_stock_detailed_data
        end

        render json: {
          holdings: holdings,
          url: @url,
          company_name: @company_name,
          sector: @sector,
          country: @country,
          dividend: @dividend
        }, status: :ok
      end


      private
        def get_stock_detailed_data
          agent = Mechanize.new
          current_page = agent.get(@url)
          @company_name = current_page.search("a:first b").text
          @sector = current_page.search(".tab-link").children[13].text
          @country = current_page.search(".tab-link").children[15].text
          @dividend = current_page.search(".snapshot-td2").children[36].text.to_f
        end
    end
  end
end
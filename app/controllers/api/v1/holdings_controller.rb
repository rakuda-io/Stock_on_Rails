module Api
  module V1
    class HoldingsController < ApplicationController
      def index
        user = User.find(params[:user_id])
        holdings = user.holdings.order(quantity: :desc)
        agent = Mechanize.new
        dividends = holdings.map { |holding|
          ticker = holding[:ticker]
          url = Stock.where(ticker: ticker).pluck(:url).join
          individual_page = agent.get(url)
          dividend = individual_page.search("td")[106].text.to_f
          Holding.where(ticker: ticker).update(dividend: dividend)
          if Holding.where(ticker: ticker).select(:company_name)
            company_name = Stock.where(ticker: ticker).pluck(:company_name).join
            Holding.where(ticker: ticker).update(company_name: company_name)
          end
          if Holding.where(ticker: ticker).select(:sector)
            sector = Stock.where(ticker: ticker).pluck(:sector).join
            Holding.where(ticker: ticker).update(sector: sector)
          end
          if Holding.where(ticker: ticker).select(:sector)
            country = Stock.where(ticker: ticker).pluck(:country).join
            Holding.where(ticker: ticker).update(country: country)
          end
          if Holding.where(ticker: ticker).select(:sector)
            Holding.where(ticker: ticker).update(url: url)
          end
        }

        render json: [
          holdings: holdings,
        ], status: :ok
      end
    end

    def ffaaf
      user = User.find(params[:user_id])
      holdings = user.holdings
      agent = Mechanize.new
      dividends = holdings.map { |holding|
        ticker = holding[:ticker]
        url = Stock.where(ticker: ticker).pluck(:url).join
        individual_page = agent.get(url)
        dividend = individual_page.search("td")[106].text.to_f
        Stock.where(ticker: ticker).update(dividend: dividend)
      }
    end

    def nil_check
      Holding.where()
    end
  end
end
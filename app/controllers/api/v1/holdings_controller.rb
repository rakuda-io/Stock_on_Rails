module Api
  module V1
    class HoldingsController < ApplicationController
      def index
        user = User.find(params[:user_id])
        holdings = user.holdings.order(total_dividend: :desc)
        agent = Mechanize.new
        dividends = holdings.map { |holding|
          ticker = holding[:ticker]
          url = Stock.where(ticker: ticker).pluck(:url).join
          individual_page = agent.get(url)
          dividend = individual_page.search("td")[106].text.to_f
          Holding.where(ticker: ticker).update(dividend: dividend)
          total_dividend = dividend * holding.quantity.to_f
          Holding.where(ticker: ticker).update(total_dividend: total_dividend)
          if Holding.where(ticker: ticker).select(:company_name)
            company_name = Stock.where(ticker: ticker).pluck(:company_name).join
            sector = Stock.where(ticker: ticker).pluck(:sector).join
            country = Stock.where(ticker: ticker).pluck(:country).join
            Holding.where(ticker: ticker).update(company_name: company_name, sector: sector, country: country, url: url)
          end
        }

        render json: [
          holdings: holdings,
          dividend: dividends,
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
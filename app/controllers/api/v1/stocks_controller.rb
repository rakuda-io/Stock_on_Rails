module Api
  module V1
    class StocksController < ApplicationController
      def index
        stocks = Stock.pluck(:ticker)

        render json: [
          stocks: stocks,
        ], status: :ok
      end
    end
  end
end
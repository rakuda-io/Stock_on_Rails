module Api
  module V1
    class HoldingsController < ApplicationController
      def index
        user = User.find(params[:user_id])
        holdings = user.holdings.order(quantity: :desc) #.select(:ticker)

        render json: [
          holdings: holdings
        ], status: :ok
      end
    end
  end
end
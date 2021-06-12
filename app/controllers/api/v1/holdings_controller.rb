module Api
  module V1
    class HoldingsController < ApplicationController
      def index
        users = User.all
        holdings = users.holdings

        render json: [
          user: users,
          holdings: holdings,
        ], status: :ok
      end
    end
  end
end
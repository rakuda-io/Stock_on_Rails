Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users do
        resources :holdings, only: %i[index]
      end
      resources :stocks
    end
  end
end
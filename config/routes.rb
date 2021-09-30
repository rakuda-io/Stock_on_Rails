Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations'
  }
  namespace :api do
    namespace :v1 do
      resources :users do
        resources :holdings, only: %i[index]
        resources :holdings, only: %i[create]
      end
      resources :stocks
    end
  end
end
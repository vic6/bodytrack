Rails.application.routes.draw do
  post '/login' => 'sessions#create'
  delete '/logout' => 'sessions#destroy'
  get '/profile' => 'users#profile'
  put '/profile' => 'users#update'
  get '/home' => 'users#home'
  resources :users
  resources :characters
  resources :snapshots
end

Rails.application.routes.draw do
  root to: 'site#index'
  post 'search', to: 'site#search'
end

RSpec.describe 'UserRequest', type: :request do
  it 'creates a new user' do
    expect do
      user_attr = FactoryBot.attributes_for(:user)
      post '/users', params: { "user": user_attr }
    end.to change(User, :count).by(1)
  end
end

# user params
# { "user": { "name": "vicrules", "username": "vicrules",
#   "password": "password", "email": "vicrulez@icecream.com" } }
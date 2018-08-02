RSpec.describe 'UserRequest', type: :request do
  before do
    @user = create(:user, username: 'Roberto',
                          email: 'robertointhehouse@hotmail.com', password: 'password')
    token = @user.auth_token
    @headers = { "Authorization": "Token #{token}",
                 "token": token.to_s }
  end
  it 'creates a new user' do
    expect do
      user_attr = FactoryBot.attributes_for(:user)
      post '/users', params: { "user": user_attr }
    end.to change(User, :count).by(1)
  end

  it 'allows user change height' do
    update = { "height": "50" }
    expect(@user.height).to eq 150
    put "/users/#{@user.id}",
        params: { user: update }, headers: @headers
    expect(response.body).to eq('{"message":"User updated"}')
    expect(User.find(@user.id).height).to eq 50
  end

  it 'allows user to change units of measurement' do
    update = { "units_of_measurement": "imperial" }
    expect(@user.units_of_measurement).to eq 'metric'
    put "/users/#{@user.id}",
        params: { user: update }, headers: @headers
    expect(User.find(@user.id).units_of_measurement).to eq 'imperial'
  end
end

# user params
# { "user": { "name": "vicrules", "username": "vicrules",
#   "password": "password", "email": "vicrulez@icecream.com" } }

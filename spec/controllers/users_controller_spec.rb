require 'spec_helper'

describe UsersController, type: :api do
  before do
    @user = User.create(name: 'TestUser', username: 'Mr.Test',
      email: 'fake@email.com', password: 'password')
    token = @user.auth_token
    header "Authorization", "Token #{token}"
  end

  it 'responds with a 404 status' do
    p @user
    get "/home"

    expect(last_response.status).to eq 401
  end

  it 'allows login in user to go to home page' do
    get "/home"
    expect(last_response.status).to eq 200
  end
end

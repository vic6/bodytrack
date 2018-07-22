require 'spec_helper'

describe UsersController, type: :api do
  it 'responds with a 401 status when not logged in' do
    get "/home"
    expect(last_response.status).to eq 401
  end

  it 'allows logged in user to  can go to their home page' do
    user = create(:user)
    token = user.auth_token
    header "Authorization", "Token #{token}"
    get "/home"
    expect(last_response.status).to eq 200
  end
end

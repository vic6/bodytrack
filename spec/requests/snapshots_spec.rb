require 'spec_helper'

RSpec.describe 'SnapshotsRequest', type: :request do
  before do
    @user = create(:user_with_snapshots)
  end

  it 'creates a snapshot' do
    token = @user.auth_token
    headers = {
      "Authorization": "Token #{token}",
      "token": token.to_s
    }
    post '/snapshots',
         params: { "stats_attributes": '{"chest_size":"10", "weight": "10",
                    "hip_size": "10", "neck_size": "10", "waist_size": "10"}' },
         headers: headers
    expect(JSON.parse(response.body)['chest_size']).to eq(10)
  end

  it 'returns all current users snapshots' do
    token = @user.auth_token
    headers = {
      "Authorization": "Token #{token}",
      "token": token.to_s
    }
    get '/home', headers: headers
    expect(@user.snapshots.length).to be 10
  end

  it 'allows a snapshot to be updated'
  it 'removes a snapshot on deletion'
end

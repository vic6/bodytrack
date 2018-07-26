require 'spec_helper'

RSpec.describe 'SnapshotsRequest', type: :request do
  before do
    @user = create(:user_with_snapshots)
    token = @user.auth_token
    @headers = {
      "Authorization": "Token #{token}",
      "token": token.to_s
    }
  end

  # {"stats_attributes"=>"{\"chest_size\":\"10\", \"weight\": \"10\", \"hip_size\": \"10\", \"neck_size\": \"10\", \"waist_size\": \"10\"}", "controller"=>"snapshots", "action"=>"create"}

  # { "user": { "name": "vicrules", "username": "vicrules",
  #   "password": "password", "email": "vicrulez@icecream.com" } }
  it 'creates a snapshot' do
    snapshot_attr = FactoryBot.attributes_for(:snapshot)
    p snapshot_attr
    post '/snapshots',
    params: { "snapshot": snapshot_attr },
        #  params: { "snapshot": {"stats_attributes": {"chest_size":"10", "weight": "10",
        #             "hip_size": "10", "neck_size": "10", "waist_size": "10"} } },
         headers: @headers

    expect(JSON.parse(response.body)['chest_size']).to eq(10)
  end

  it 'returns all current users snapshots' do
    get '/home', headers: @headers
    expect(@user.snapshots.length).to be 10
  end

  it 'allows a snapshot to be updated' do
    snapshot_id = @user.snapshots.first.id
    expect(@user.snapshots.find_by(id: snapshot_id).weight).to eq 200
    put "/snapshots/#{snapshot_id}",
        params: { snapshot: { "weight": "500" } }, headers: @headers
    expect(response.body).to eq('{"message":"Image Updated"}')
    expect(@user.snapshots.find_by(id: snapshot_id).weight).to eq 500
  end

  it 'removes a snapshot on deletion' do
    snapshot_id = @user.snapshots.first.id
    expect(@user.snapshots.find_by(id: snapshot_id)).to_not eq nil
    delete "/snapshots/#{snapshot_id}", headers: @headers
    expect(@user.snapshots.find_by(id: snapshot_id)).to eq nil
  end
end

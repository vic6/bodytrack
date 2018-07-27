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

  it 'creates a snapshot' do
    snapshot_attr = FactoryBot.attributes_for(:snapshot).to_json
    picture = Rack::Test::UploadedFile.new(
      Rails.root.join('spec/support/blackbears.jpg'), 'image/jpeg'
    )
    post '/snapshots',
         params: { "snapshot": snapshot_attr, "picture": picture },
         headers: @headers
    parsed_response = JSON.parse(response.body)
    expect(parsed_response['chest_size']).to eq(49)
    expect(parsed_response['picture']['url']).to_not eq nil
  end

  it 'returns all current users snapshots' do
    get '/home', headers: @headers
    expect(@user.snapshots.length).to be 10
  end

  it 'allows a snapshot to be updated' do
    snapshot_id = @user.snapshots.first.id
    update = { "weight": "500" }.to_json
    expect(@user.snapshots.find_by(id: snapshot_id).weight).to eq 200
    put "/snapshots/#{snapshot_id}",
        params: { snapshot: update }, headers: @headers
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

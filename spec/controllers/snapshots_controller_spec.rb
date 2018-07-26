describe SnapshotsController, type: :api do
  before do
    @user = create(:user_with_snapshots)
  end

  it 'returns a created snapshot' do
    token = @user.auth_token
    header "Authorization", "Token #{token}"
    get '/home'
    expect(@user.snapshots.length).to be 10
  end

  it 'shows a user snapshot' do
    @user
  end
  it 'allows a snapshot to be updated'
  it 'removes a snapshot on deletion'
end

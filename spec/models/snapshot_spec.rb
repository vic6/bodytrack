RSpec.describe Snapshot, type: :model do
  before do
    @snapshot = create(:snapshot)
  end
  it 'it is valid with a user id' do
    expect(@snapshot).to be_valid
  end

  it 'is not valid without user id' do
    snapshot2 = build(:snapshot, user_id: nil)
    expect(snapshot2).to_not be_valid
  end

  it 'user can have multiple snapshots' do
    user = build(:user)
    5.times do
      user.snapshots.build(weight: rand(100..400))
    end
    expect(user.snapshots.length).to be 5
  end
end

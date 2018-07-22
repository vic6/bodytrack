require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    @user = create(:user)
  end

  it 'is valid with valid attributes' do
    expect(@user).to be_valid
  end

  it 'is invalid without a username' do
    user2 = build(:user, username: '')
    expect(user2).to_not be_valid
  end

  it 'has a unique username' do
    user2 = build(:user, email: 'user2rulez@hotmail.com')
    expect(user2).to_not be_valid
  end

  it 'is invalid without a password' do
    user2 = build(:user, password: '')
    expect(user2).to_not be_valid
  end

  it 'has a unique email' do
    user2 = build(:user, username: 'user2isKing')
    expect(user2).to_not be_valid
  end

  it 'is invalid without a valid email' do
    user2 = build(:user, email: 'user2@ice.cream@blah.com')
    expect(user2).to_not be_valid
  end
end

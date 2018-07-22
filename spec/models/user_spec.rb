require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is valid with valid attributes' do
    @user = build(:user)
    expect(@user).to be_valid
  end

  it 'is not valid without a username' do
    @user = User.new(name: 'Bob', username: '',
                     email: 'fake@email.com', password: 'password')
    expect(@user).to_not be_valid
  end

  it 'must signup with a valid email' do
    @user = User.new(name: 'TestUser', username: 'Mr.Test',
                     email: 'fakeemail.com', password: 'password')
    expect(@user).to_not be_valid
  end
end

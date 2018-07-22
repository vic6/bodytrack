require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create(name: 'TestUser', username: 'Mr.Test',
                        email: 'fake@email.com', password: 'password')
  end

  test "Unauthorized when not logged in" do
    get home_path
    assert_response 401
  end

  test '/home calls home action' do
    assert_routing '/home', controller: 'users', action: 'home'
  end

  test "Logged in user directs to their homepage" do
    require_login
    p @user
    get home_path(@user)
    assert_response :success
  end
end

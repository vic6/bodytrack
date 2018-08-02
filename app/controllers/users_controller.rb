class UsersController < ApiController
  before_action :require_login, except: [:create]

  def create
    user = User.create!(user_params)
    render json: { token: user.auth_token }
  end

  def home
    user = User.find_by_auth_token!(request.headers[:Authorization].split(' ')[1])
    user_snapshots = user.snapshots
    render json: { snapshots: user_snapshots }
  end

  def profile
    user = User.find_by_auth_token!(request.headers[:token])
    user_characters = user.characters
    render json: { user: { username: user.username, email: user.email, name: user.name },
                   characters: user_characters }
  end

  def update
    user = User.find_by_auth_token!(request.headers[:token])
    if user.update_attributes(user_params)
      render json: { message: 'User updated' }
    else
      render json: { message: 'Unable to update user' }
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :units_of_measurement, :height, :password, :name)
  end
end

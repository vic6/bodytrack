class SnapshotsController < ApiController
  # before_action :require_login, except: %i[index show]
  before_action :require_login

  def index
    p current_user
    thing = p 'HI' * 50
    p thing
    render json: { hi: thing }
  end

  def create
    p '$' * 50
    new_image = Snapshot.new
    p '*' * 50
    p new_image
    p params['upladed_image']
    new_image.picture = params['uploaded_image']
    # new_image.user = current_user
    # p current_user
    binding.pry
    if new_image.save
      render json: Snapshot.last
    end
  end

  private

  def snapshot_params
    params.require(:snapshot).permit(:content, :picture)
  end
end

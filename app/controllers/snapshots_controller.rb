class SnapshotsController < ApiController
  # before_action :require_login, except: %i[index show]
  before_action :require_login

  def index
    snapshots = Snapshot.all
    render json: { snapshots: snapshots }
  end

  def create
    new_image = Snapshot.new
    new_image.picture = params['uploaded_image']
    new_image.user = current_user
    # binding.pry
    render json: Snapshot.last if new_image.save
  end

  private

  def snapshot_params
    params.require(:snapshot).permit(:picture, :neck_size, :hip_size,
                                     :waist_size, :chest_size, :note)
  end
end

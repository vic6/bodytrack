class SnapshotsController < ApiController
  # before_action :require_login, except: %i[index show]
  before_action :require_login

  def index
    snapshots = Snapshot.all
    render json: { snapshots: snapshots }
  end

  def create
    new_image = Snapshot.new
    stats = JSON.parse(params['stats'])
    new_image.picture = params['uploaded_image']
    new_image.weight = stats['weight']
    new_image.neck_size = stats["neck_size"].to_i
    new_image.chest_size = stats["chest_size"].to_i
    new_image.waist_size = stats["waist_size"].to_i
    new_image.hip_size = stats["hip_size"].to_i
    new_image.user = current_user
    render json: Snapshot.last if new_image.save
  end

  private

  def snapshot_params
    params.require(:snapshot).permit(:picture, :neck_size, :hip_size,
                                     :waist_size, :chest_size, :note)
  end
end

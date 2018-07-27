class SnapshotsController < ApiController
  before_action :require_login

  def index
    snapshots = Snapshot.all
    render json: { snapshots: snapshots }
  end

  def show
    image = current_user.snapshots.find(params['id'])
    render json: { snapshot: image }
  end

  def create
    image = current_user.snapshots.build(snapshot_params)
    image.picture = params['picture']
    render json: Snapshot.last if image.save
  end

  # def edit
  #   snapshot = current_user.snapshots.find(params['id'])
  # end

  def update
    snapshot = current_user.snapshots.find(params['id'])
    if snapshot.update_attributes(snapshot_params)
      render json: { message: 'Image Updated' }
    else
      render json: { error: 'Unable to update image' }
    end
  end

  def destroy
    current_user.snapshots.find(params['id']).destroy
    render json: { "message": "Snapshot deleted" }
  end

  private

  def snapshot_params
    params['snapshot'] = JSON.parse(params['snapshot'])
    params.require(:snapshot).permit(:picture, :chest_size, :waist_size, :hip_size, :neck_size, :weight)
  end
end

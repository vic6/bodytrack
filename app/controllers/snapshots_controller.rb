class SnapshotsController < ApiController
  before_action :require_login
  # wrap_parameters include: :stats_attributes
  # respond_to? :json

  def index
    snapshots = Snapshot.all
    render json: { snapshots: snapshots }
  end

  def show
    image = current_user.snapshots.find(params['id'])
    render json: { snapshot: image }
  end

  def create
    new_image = Snapshot.new
    stats = JSON.parse(params['stats_attributes'])
    new_image.picture = params['uploaded_image']
    new_image.weight = stats['weight']
    new_image.neck_size = stats["neck_size"].to_i
    new_image.chest_size = stats["chest_size"].to_i
    new_image.waist_size = stats["waist_size"].to_i
    new_image.hip_size = stats["hip_size"].to_i
    new_image.user = current_user
    render json: Snapshot.last if new_image.save
  end

  def edit
    snapshot = current_user.snapshots.find(params['id'])
  end

  def update
    snapshot = current_user.snapshots.find(params['id'])
    updated_snapshot = {}
    updated_snapshot['weight'] = params['snapshot']['weight'] if params['snapshot']['weight']
    updated_snapshot['date'] = params['snapshot']['date'] if params['snapshot']['date']
    updated_snapshot['neck_size'] = params['snapshot']['neck_size'] if params['snapshot']['neck_size']
    updated_snapshot['chest_size'] = params['snapshot']['chest_size'] if params['snapshot']['chest_size']
    updated_snapshot['waist_size'] = params['snapshot']['waist_size'] if params['snapshot']['waist_size']
    updated_snapshot['hip_size'] = params['snapshot']['hip_size'] if params['snapshot']['hip_size']

    if snapshot.update(updated_snapshot)
      render json: { message: 'Image Updated' }
    else
      render json: { error: 'Image update unsuccessful' }
    end
  end

  def destroy
    current_user.snapshots.find(params['id']).destroy
    render json: { "message": "Snapshot deleted" }
  end

  private

  def snapshot_params
    params.require(['uploaded_image']).permit(stats_attributes: %i[weight waist_size hip_size chest_size neck_size])
  end
end

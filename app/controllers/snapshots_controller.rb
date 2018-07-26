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
    # new_image = Snapshot.create!(snapshot_params)

    image = Snapshot.new
    # p snapshot_params
    # binding.pry
    # image = current_user.snapshots.build(snapshot_params)
    p image
    # p snapshot_params
    # binding.pry
    stats = JSON.parse(params['stats_attributes'])
    
    # stats = params['stats_attributes']
    image.picture = params['uploaded_image']
    image.weight = stats['weight'].to_i
    image.neck_size = stats["neck_size"].to_i
    image.chest_size = stats["chest_size"].to_i
    image.waist_size = stats["waist_size"].to_i
    image.hip_size = stats["hip_size"].to_i
    image.user = current_user
    render json: Snapshot.last if image.save
  end

  def edit
    snapshot = current_user.snapshots.find(params['id'])
  end

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
    params.require(:snapshot).permit(%i[stats_attributes chest_size waist_size hip_size neck_size weight])
  end
end

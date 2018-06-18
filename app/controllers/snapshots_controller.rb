class SnapshotsController < ApiController
  # before_action :require_login, except: %i[index show]
  before_action :require_login
  # wrap_parameters include: :stats_attributes
  # respond_to? :json

  def index
    snapshots = Snapshot.all
    render json: { snapshots: snapshots }
  end

  def show
    image = current_user.snapshots.find(params['id'])
    render json: {snapshot: image }
  end


  def create
    # new_image = current_user.snapshots.build(snapshot_params)
    # p '*' * 50
    # p snapshot_params
    # p '*' * 50
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
    # binding.pry
    snapshot = current_user.snapshots.find(params['id'])
    p '*' * 50
    p snapshot
    p '*' * 50
    p params

    updated_snapshot = {}

    if params['snapshot']['weight']
      updated_snapshot['weight'] = params['snapshot']['weight']
    end

    if params['snapshot']['date']
      updated_snapshot['date'] = params['snapshot']['date']
    end

    if params['snapshot']['neck_size']
      updated_snapshot['neck_size'] = params['snapshot']['neck_size']
    end

    if params['snapshot']['chest_size']
      updated_snapshot['chest_size'] = params['snapshot']['chest_size']
    end

    if params['snapshot']['waist_size']
      updated_snapshot['waist_size'] = params['snapshot']['waist_size']
    end

    if params['snapshot']['hip_size']
      updated_snapshot['hip_size'] = params['snapshot']['hip_size']
    end

    # if params['snapshot']['stats_attributes']['weight']
    #   updated_character['weight'] = params['stats_attributes']['weight']
    # end
    # if params['snapshot']['stats_attributes']['neck_size']
    #   updated_character['neck_size'] = params['stats_attributes']['neck_size']
    # end
    # if params['snapshot']['stats_attributes']['chest_size']
    #   updated_character['chest_size'] = params['stats_attributes']['chest_size']
    # end

    if snapshot.update(updated_snapshot)
      render json: { message: 'Image Updated' }
    else
      render json: { error: 'CRITCAL SYSTEM FAILURE SELF DESTRUCT INITIATED'}
    end

    # stats = JSON.parse(params['stats'])

    # image.update(chest_size: params['chest_size'])
    # image.update(neck_size: params['neck_size'])
    # image.update(hip_size: params['hip_size'])
    # image.update(waist_size: params['waist_size'])

    # if image.save
    #   render json: image
    # else
    #   render json: { error: 'There has been an error dog' }
    # end
  end

  def destroy
    current_user.snapshots.find(params['id']).destroy
    render json: { "message": "Snapshot deleted" }
  end

  private

  def snapshot_params
    p 'dude' * 20
    # stats = JSON.parse(params['stats'])
    p 'hello' * 50
    p params[:stats_attributes]
    p 'hello' * 50
    params.require(['uploaded_image']).permit(stats_attributes: [:weight, :waist_size, :hip_size, :chest_size, :neck_size])
  end
end

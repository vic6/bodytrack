class SnapshotsController < ApiController
  # before_action :require_login, except: %i[index show]

  def create
    p '$' * 50
    new_image = Snapshot.new
    p '*' * 50
    p new_image
    p params['upladed_image']
    new_image.picture = params['uploaded_image']
    # new_image.user = current_user
    # p current_user
    # binding.pry
    if new_image.save
      render json: Snapshot.last
    end
  end

  private

  def snapshot_params
    params.require(:snapshot).permit(:content, :picture)
  end
end

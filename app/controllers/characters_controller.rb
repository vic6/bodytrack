class CharactersController < ApiController
  before_action :require_login, except: %i[index show]

  def index
    characters = Character.all
    render json: { characters: characters }
  end

  def show
    character = Character.find(params[:id])
    render json: { character: character }
  end

  def create
    character = Character.new(character_params)
    character.user = current_user

    if character.save
      render json: {
        message: 'ok',
        character: character
      }
    else
      render json: { message: 'Could not create character' }
    end
  end

  private

  def character_params
    params.require(:character).permit(:name, :description)
  end
end

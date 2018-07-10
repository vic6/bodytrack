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
    character = current_user.characters.build(character_params)
    if character.save
      render json: {
        message: 'ok',
        character: character
      }
    else
      render json: { message: 'Could not create character' }
    end
  end

  def edit
    character = Character.find(params[:id])
  end

  def update
    character = Character.find(params[:id])
    updated_character = {}
    if params['character']['name']
      # name = {name: params['character']['name']}
      updated_character['name'] = params['character']['name']
    end
    if params['character']['description']
      # description = {description: params['character']['description']}
      updated_character['description'] = params['character']['description']
    end
    p '@'* 50
    p character_params
    p updated_character
    p '@'* 50
    if character.update(updated_character)
      render json: {success: "Character Updated"}
    else
      render json: {error: "Character not Updated"}
    end
  end

  private

  def character_params
    params.require(:character).permit(:name, :description)
  end
end

require 'pry'
class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all 
        # options = {
        #     include: [:pokemons]
        # }
        render json: pokemons
        # render json: TrainerSerializer.new(trainers, options)
    end 
    
    
    def show 
        pokemon = Pokemon.find_by(params[:id])
        # options = {
        #     include: [:pokemons]
        # }
        render json: pokemon
        # render json: TrainerSerializer.new(trainer, options)
    end 


    def create
        trainer = Trainer.find(params[:trainer_id])
        pokemon = trainer.pokemons.build({
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name
        })

        if pokemon.save
             render json: pokemon 
        else 
            render json: {message: pokemon.errors.messages[:team_max][0]}
        end 
        
    end 

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end 
end
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainDiv = document.querySelector('main')


document.addEventListener("DOMContentLoaded", () => loadTrainers())  

const loadTrainers = function fetchTrainers(){
    
    return fetch(TRAINERS_URL)
    .then( resp => resp.json())
    .then(trainers => {   
        trainers.forEach(trainer =>renderTrainer(trainer))
    })
}

function renderTrainer(trainer){
    const div= document.createElement('div')
    const p = document.createElement('p')
    const ul = document.createElement('ul')
    const button = document.createElement('button')
    

    div.setAttribute("class", "card")
    div.setAttribute("data_id", trainer.id)
    p.innerText = trainer.name

    button.setAttribute("data-trainer-id", trainer.id)
    button.innerText = "Add Pokemon"

    trainer.pokemons.forEach(pokemon => renderPokemon(pokemon))
    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)
    mainDiv.appendChild(div)
        
    function renderPokemon(pokemon){
        console.log(pokemon)
        const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
        const li = document.createElement('li')
        const button = document.createElement('button')
        
        button.setAttribute("class", "release")
        button.setAttribute("data-pokemon-id", pokemon.id)
        button.innerHTML = "Release"
        li.innerHTML =  `${pokemon.nickname} (${pokemon.species})`
        ul.appendChild(li)
        li.appendChild(button)
    
    }

    

}
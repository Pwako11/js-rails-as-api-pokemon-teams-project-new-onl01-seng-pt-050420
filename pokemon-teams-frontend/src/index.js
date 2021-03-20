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
    button.addEventListener("click", createPokemon )
    // attach event listener to button (click)

    trainer.pokemons.forEach(pokemon => renderPokemon(pokemon))
    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)
    mainDiv.appendChild(div)
    
    function renderPokemon(pokemon){
            // console.log(pokemon)
        // const ul = document.createElement('ul')
        // const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
        const li = document.createElement('li')
        const button = document.createElement('button')
            // attach event listener to button (click)
            
        button.setAttribute("class", "release")
        button.setAttribute("data-pokemon-id", pokemon.id)
        button.innerHTML = "Release"
        button.addEventListener("click", deletePokemon )
        li.innerHTML =  `${pokemon.nickname} (${pokemon.species})`
        li.appendChild(button)
        ul.appendChild(li)
        div.appendChild(ul)
    }


    function createPokemon(e) {
        e.preventDefault()
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json" 
            },
            body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
        }
    
        fetch(POKEMONS_URL, configObj)
        .then( resp => resp.json())
        .then( json => {
           if (json.message){
               alert(json.message)
            } 
           else { 
            renderPokemon(json)
            }       
        })
    }
}
    
function deletePokemon(e) {
    e.preventDefault()
    
    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json" 
        },
    }

    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
    e.target.parentElement.remove()
}
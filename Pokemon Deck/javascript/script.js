const submit = document.getElementById('submit');
const search = document.getElementById('search');
const resultHeading = document.getElementById('result-heading');
const container = document.getElementById('container');


const pokemon = [];

const fetchData = async (id) =>{
    const fetchApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        pokemon.push(data);
    });
}
for(let i= 1; i <= 800; i++){
    fetchData(i);
}


function searchPokiDeck(e) {
    e.preventDefault();
    // Clear pokemon container
    container.innerHTML = '';
  
    // Get search term
    const term = search.value;
    outputContainer(term);


    // Clear search text
    search.value = '';
}
function outputContainer(term) {
    let matchesPoki = pokemon.filter(poki => {
        const regex = new RegExp(`^${term}`, 'gi');
        return poki.name.match(regex);
    });
    
    if (term) {
        const htmlContainer = matchesPoki.map(
            (match) =>
            `
            <div class="pokemon" id="pokemon" data-modal-target="${match.id}">
                <div class="img-container">
                    <img src="https://pokeres.bastionbot.org/images/pokemon/${match.id}.png" alt="${name}" />
                </div>
                <div class="info">
                    <span class="number">#${match.id}</span>
                    <h3 class="name">${match.name}</h3>
                </div>
            </div>

            <div class="pokemon-detail" id="${match.id}">
                <div class="modal-panel img-detail">
                    <img src="https://pokeres.bastionbot.org/images/pokemon/${match.id}.png" alt="${name}" />
                </div>
                <div class="modal-panel poke-detail">
                    <h3 class="number">ID: #${match.id}</h3>
                    <p><span class="name">Name: </span>${match.name}</p>
                    <p><span class="name">Base Experience: </span>${match.base_experience}</p>
                    <p><span class="name">Height: </span>${match.height}</p>
                    <p><span class="name">Weight: </span>${match.weight}</p>
                </div>
            </div>
            
            `
        ).join('');
        


        container.innerHTML = htmlContainer;

        
        const modalTriggerButtons = document.querySelectorAll("[data-modal-target]");
        const modals = document.querySelectorAll('.pokemon-detail');
        modalTriggerButtons.forEach(elem => {
            elem.addEventListener("click", event => toggleModal(event.currentTarget.getAttribute("data-modal-target")));
          });
          
        function toggleModal(modalId) {
            const modal = document.getElementById(modalId);
          
            if(modal.classList.contains("show")) {
                modal.classList.add('hide');
              modal.classList.remove('show','hide');
            }
            else{
                modal.classList.add('show');
            }
        }
        document.addEventListener("keydown", event => {
            if(event.keyCode === 27 && document.querySelector(".pokemon-detail.show")) {
              toggleModal(document.querySelector(".pokemon-detail.show").id);
            }
        });

        modals.forEach(elem => {
            elem.addEventListener("click", event => event.currentTarget === event.target ? toggleModal(event.currentTarget.id) : false);
            });
    }
    else {
        resultHeading.innerHTML =`<p> Please type your favourite Pokemon!! </p>`
    }
}



submit.addEventListener('submit', searchPokiDeck);

const pokedexSection = document.querySelector('#pokedex-section');
const addButoon = document.querySelector('.add-btn');
const saveButton = document.querySelector('.save-btn');
const clearButton = document.querySelector('.clear-btn')

const fetchPokemon = async (pokemon) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data
  } catch (error) {
    return error;
  }
}

const createCards = (content) => {
  const cardHolder = document.createElement('div');
  cardHolder.className = 'card-holder';
  const nameDiv = document.createElement('div');
  const typeDiv = document.createElement('div');
  const imgDiv = document.createElement('div');
  const imgHolder = document.createElement('img');
  const indexDiv = document.createElement('div');

  content.forms.find((element) => {
    nameDiv.innerText = `Name: ${element.name}`; // NAME
  })

  const myarr = []
  content.types.filter((element) => {
    myarr.push(element.type.name);
    typeDiv.innerHTML = `Type: ${[...myarr]}`
  })

  content.game_indices.find((elemento) => {
    indexDiv.innerText = `Index: ${elemento.game_index}`; // INDEX
  })
  imgHolder.src = content.sprites.front_default; // IMAGE

  imgDiv.appendChild(imgHolder);
  cardHolder.appendChild(imgDiv);
  cardHolder.appendChild(nameDiv);
  cardHolder.appendChild(typeDiv);
  cardHolder.appendChild(indexDiv);
  cardHolder.addEventListener('dblclick', () => {
    cardHolder.remove();
  })
  pokedexSection.appendChild(cardHolder);
}

const getPokemonsFromAPI = async (poke) => {
  const pokemon = await fetchPokemon(poke);
  createCards(pokemon);
}

addButoon.addEventListener('click', () => {
  const inputValue = document.querySelector('input');
  getPokemonsFromAPI(inputValue.value.toLocaleLowerCase()); // POKEMONS NA API ESTÃO EM LETRA MINÚSCULA
  inputValue.value = '';
})

const setItems = () => {
  localStorage.setItem('myPokedex', pokedexSection.innerHTML);
}

saveButton.addEventListener('click', setItems);

const loadLocalStorage = () => {
  const saved = localStorage.getItem('myPokedex');
  pokedexSection.innerHTML = saved;
  const items = document.querySelectorAll('.card-holder');
  items.forEach((elemento) => {
    elemento.addEventListener('dblclick', () => {
      elemento.remove();
    })
  })
}
loadLocalStorage();

clearButton.addEventListener('click', () => {
  pokedexSection.innerHTML = '';
})

window.onload = async () => {
  console.log('A-HA! VOCÊ ACHOU O ATALHO SECRETO! ----> CLIQUE DUAS VEZES NO CARD PARA REMOVER O POKÉMON <----');
  await getPokemonsFromAPI();
}
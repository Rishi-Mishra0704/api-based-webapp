import './index.css'
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=6&offset=0';
async function showPokemon() {
  const response = await fetch(BASE_URL);
  const data = await response.json();

  const likeableItems = document.getElementById('likeable-items');

  data.results.forEach(async pokemon => {
    const listItem = document.createElement('li');
    const pokemonData = await fetch(pokemon.url).then(res => res.json());
    listItem.innerHTML = `
      <img class="item-image" src="${pokemonData.sprites.front_default}">
      <span class="item-name">${pokemon.name}</span>
      <span class="item-name">${pokemonData.weight}</span>
      <button class="like-button">Like</button>
    `;
    likeableItems.appendChild(listItem);
  });
}

showPokemon();

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=6&offset=0';
async function showPokemon() {
  const response = await fetch(BASE_URL);
  const data = await response.json();

  const likeableItems = document.getElementById('likeable-items');

  data.results.forEach(async pokemon => {
    const listItem = document.createElement('li');
    const pokemonData = await fetch(pokemon.url).then(res => res.json());

    // Get abilities and stats
    const abilities = pokemonData.abilities.map(ability => ability.ability.name).join(', ');
    const stats = pokemonData.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');

    listItem.innerHTML = `
      <img class="item-image" src="${pokemonData.sprites.front_default}">
      <span class="item-name">${pokemon.name}</span>
      <span class="item-name">${pokemonData.weight}</span>
      <span class="item-name">Abilities: ${abilities}</span>
      <span class="item-name">Stats: ${stats}</span>
      <button class="like-button">
        Like <span class="badge">0</span>
      </button>
    `;

    likeableItems.appendChild(listItem);
  });
}
export default showPokemon;

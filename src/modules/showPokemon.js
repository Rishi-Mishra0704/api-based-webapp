const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=6&offset=0";
const INVOLVE_API =
  "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/eNcbFL1NPb8wUFbHRoP3/likes";
async function showPokemon() {
  const response = await fetch(BASE_URL);
  const data = await response.json();

  const likeableItems = document.getElementById("likeable-items");

  const promises = data.results.map((pokemon) => {
    return fetch(pokemon.url).then((res) => res.json());
  });

  const pokemonDataArray = await Promise.all(promises);

  pokemonDataArray.forEach((pokemonData) => {
    const listItem = createListItem(pokemonData);
    likeableItems.appendChild(listItem);
  });
}

function createListItem(pokemonData) {
  const listItem = document.createElement("li");

  const abilities = pokemonData.abilities
    .map((ability) => ability.ability.name)
    .join(", ");
  const stats = pokemonData.stats
    .map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
    .join(", ");

  listItem.innerHTML = `
      <img class="item-image" src="${pokemonData.sprites.front_default}">
      <span class="item-name">${pokemonData.name}</span>
      <span class="item-name">${pokemonData.weight}</span>
      <span class="item-name">Abilities: ${abilities}</span>
      <span class="item-name">Stats: ${stats}</span>
      <button class = "comments">Comment</button>
      <button class="like-button">
        Like <span class="badge">0</span>
      </button>
    `;

  const likeButton = listItem.querySelector(".like-button");
  const likeCount = listItem.querySelector(".badge");

  likeButton.addEventListener("click", async () => {
    const response = await fetch(INVOLVE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: pokemonData.id,
      }),
    });
    const likes = await response.json();
    likeCount.innerHTML = likes.likes;
  });

  return listItem;
}

export default showPokemon;

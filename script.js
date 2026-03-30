const pokemonGrid = document.querySelector("#pokemon-grid");
const featuredCard = document.querySelector("#featured-card");
const statusText = document.querySelector("#status");
const searchForm = document.querySelector("#search-form");
const input = document.querySelector("#pokemon-input");
const refreshButton = document.querySelector("#refresh-button");
const clearCacheButton = document.querySelector("#clear-cache-button");

const CACHE_KEY = "pokelive-cache-v1";
const CACHE_TTL_MS = 1000 * 60 * 10;

function setStatus(message, isError = false) {
  statusText.textContent = message;
  statusText.style.color = isError ? "#b91c1c" : "#4b5563";
}

function getCachedFeed() {
  try {
    const rawCache = localStorage.getItem(CACHE_KEY);
    if (!rawCache) return null;

    const parsed = JSON.parse(rawCache);
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return parsed.data;
  } catch {
    return null;
  }
}

function setCachedFeed(data) {
  const payload = {
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
}

function createPokemonCard(pokemon) {
  const card = document.createElement("article");
  card.className = "pokemon-card";
  card.tabIndex = 0;

  card.innerHTML = `
    <img src="${pokemon.sprite}" alt="${pokemon.name}" />
    <h3>${pokemon.name}</h3>
    <p>#${pokemon.id}</p>
    <div class="chips">
      ${pokemon.types.map((type) => `<span class="chip">${type}</span>`).join("")}
    </div>
  `;

  function selectCard() {
    featuredCard.innerHTML = `
      <h3>${pokemon.name} (#${pokemon.id})</h3>
      <p><strong>Height:</strong> ${pokemon.height}m</p>
      <p><strong>Weight:</strong> ${pokemon.weight}kg</p>
      <p><strong>Base experience:</strong> ${pokemon.baseExperience}</p>
      <p><strong>Types:</strong> ${pokemon.types.join(", ")}</p>
    `;
  }

  card.addEventListener("click", selectCard);
  card.addEventListener("keypress", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectCard();
    }
  });

  return card;
}

function renderGrid(pokemonList) {
  pokemonGrid.innerHTML = "";
  const fragment = document.createDocumentFragment();

  pokemonList.forEach((pokemon) => {
    fragment.appendChild(createPokemonCard(pokemon));
  });

  pokemonGrid.appendChild(fragment);
}

async function fetchPokemonByName(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

  if (!response.ok) {
    throw new Error("Pokémon not found. Try another name.");
  }

  const data = await response.json();
  return mapPokemon(data);
}

function mapPokemon(data) {
  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
    height: data.height / 10,
    weight: data.weight / 10,
    baseExperience: data.base_experience,
    types: data.types.map((item) => item.type.name),
  };
}

async function fetchRandomFeed(limit = 12) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`);

  if (!response.ok) {
    throw new Error("Could not load Pokémon feed.");
  }

  const data = await response.json();
  const randomized = [...data.results].sort(() => Math.random() - 0.5).slice(0, limit);

  const details = await Promise.all(
    randomized.map(async (pokemon) => {
      const detailResponse = await fetch(pokemon.url);
      if (!detailResponse.ok) {
        throw new Error("Failed to load one or more Pokémon.");
      }
      const detailData = await detailResponse.json();
      return mapPokemon(detailData);
    })
  );

  return details;
}

async function loadInitialData() {
  const cached = getCachedFeed();

  if (cached) {
    renderGrid(cached);
    setStatus("Loaded cached data from this device.");
    return;
  }

  try {
    setStatus("Loading live data from PokeAPI...");
    const feed = await fetchRandomFeed();
    renderGrid(feed);
    setCachedFeed(feed);
    setStatus("Loaded live Pokémon feed.");
  } catch (error) {
    setStatus(error.message, true);
  }
}

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) return;

  try {
    setStatus(`Searching for ${query}...`);
    const pokemon = await fetchPokemonByName(query);
    renderGrid([pokemon]);
    setStatus(`Showing result for ${pokemon.name}.`);
  } catch (error) {
    setStatus(error.message, true);
  }
});

refreshButton.addEventListener("click", async () => {
  try {
    setStatus("Refreshing live feed...");
    const feed = await fetchRandomFeed();
    renderGrid(feed);
    setCachedFeed(feed);
    setStatus("Live feed refreshed.");
  } catch (error) {
    setStatus(error.message, true);
  }
});

clearCacheButton.addEventListener("click", () => {
  localStorage.removeItem(CACHE_KEY);
  setStatus("Local cache cleared.");
});

loadInitialData();

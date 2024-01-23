async function fetchPokemonData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  }
  
  async function displayPokemonList() {
    const pokemonListContainer = document.getElementById('pokemonList');
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    const data = await response.json();
    const pokemons = data.results;
  
    pokemons.forEach(async (pokemon) => {
      const pokemonData = await fetchPokemonData(pokemon.url);
      const pokemonCard = document.createElement('li');
      pokemonCard.classList.add('pokemon-card');
      pokemonCard.textContent = pokemonData.name;
  
      pokemonCard.addEventListener('click', () => displayPokemonDetails(pokemonData));
  
      pokemonListContainer.appendChild(pokemonCard);
    });
  }
  
  function displayPokemonDetails(pokemon) {
    const pokemonDetailsContainer = document.getElementById('pokemonDetails');
    pokemonDetailsContainer.innerHTML = `
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <p>Height: ${pokemon.height}</p>
      <p>Weight: ${pokemon.weight}</p>
      <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
    `;
    pokemonDetailsContainer.style.display = 'block';
  }
  
  displayPokemonList();
  
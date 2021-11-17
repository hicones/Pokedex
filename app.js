const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) => 
  fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
  const elementTypes = types.map(typeInfo => typeInfo.type.name)

  accumulator += `
    <li class="card ${elementTypes[0]}">
      <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"/> 
      <h2 class="card-title">${id}. ${name}</h2>
      <p class="card-subtitle">${elementTypes.join(' | ')}</p>
    </li>
  `
  return accumulator
}, '')


const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonsIntoPage);

////////////////////////////Dark Mode /////////////////////////////////////

const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
	document.body.classList.toggle('dark');
});

///////////////////////// Search Box ///////////////////////////////////////

const searchBox = document.querySelector(".search-box");
      const searchBtn = document.querySelector(".search-icon");
      const cancelBtn = document.querySelector(".cancel-icon");
      const searchInput = document.querySelector("input");
      const searchData = document.querySelector(".search-data");
      searchBtn.onclick =()=>{
        searchBox.classList.add("active");
        searchBtn.classList.add("active");
        searchInput.classList.add("active");
        cancelBtn.classList.add("active");
        searchInput.focus();
        if(searchInput.value != ""){
          var values = searchInput.value;
          searchData.classList.remove("active");
          searchData.innerHTML = "Você buscou por " + "<span style='font-weight: 500;'>" + values + "</span>";
        }else{
          searchData.textContent = "";
        }
      }
      cancelBtn.onclick =()=>{
        searchBox.classList.remove("active");
        searchBtn.classList.remove("active");
        searchInput.classList.remove("active");
        cancelBtn.classList.remove("active");
        searchData.classList.toggle("active");
        searchInput.value = "";
      }
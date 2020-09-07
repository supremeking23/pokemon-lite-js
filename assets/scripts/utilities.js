// function capitalize(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

//module.exports = { capitalize };
async function hello() {
  const result1 = await new Promise((resolve) =>
    setTimeout(() => resolve("1"))
  );

  return result1;
}
console.log(hello());

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const pokemonList = document.querySelector(".pokemon-list");

async function getPokemon(url) {
  const pokemons = await fetch(url);
  const pokemon_data = await pokemons.json();
  return pokemon_data;
}

async function load(url) {
  let pokemon = await getPokemon(url);
  //console.log(pokemon);

  return pokemon;
}

async function loadImage(url) {
  let detail = await load(url);
  return detail.sprites.other["official-artwork"].front_default;
}

async function getAllPokemon() {
  const pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const pokemon_data = await pokemons.json();

  let lists = await Promise.all(
    pokemon_data.results.map(async (pokemon) => {
      let image = await loadImage(pokemon.url);
      let type;
      let data = `
              <div class="col mb-4">
              <div class="card">
              <div class="d-flex flex-column align-items-center justify-content-center pokemon-img-container">
    
              <img src="${image}"
              class="card-img-top pokemon-img" alt="..." />
              <div class="d-flex justify-content-between" style="background:;width:40%">
                <span class="type">Fire</span>
                <span class="type">Fire</span>
              </div>
              </div>
                <div class="card-body">
                  <h5 class="card-title text-center">${capitalize(
                    pokemon.name
                  )}</h5>
                  <p class="card-text text-center">
                   <a href="pokemon-details.html?pokemon=${
                     pokemon.url
                   }"> View Details </a>
                  </p>
                </div>
              </div>
            </div>`;

      return data;
    })
  );

  pokemonList.innerHTML = lists.join("");
}

getAllPokemon();

// getPokemonImageByURL2(`https://pokeapi.co/api/v2/pokemon/1`);

// const getAllPokemon = () => {
//   fetch(`https://pokeapi.co/api/v2/pokemon`)
//     .then((res) => res.json())
//     .then((data) => {
//       let lists = data.results.map((pokemon, index) => {
//         let data = `
//           <div class="col mb-4">
//           <div class="card">
//           <div class="d-flex justify-content-center pokemon-img-container">

//           <img src="...."
//           class="card-img-top pokemon-img" alt="..." />

//           </div>
//             <div class="card-body">
//               <h5 class="card-title text-center">${capitalize(
//                 pokemon.name
//               )}</h5>
//               <p class="card-text">
//                 This is a longer card with supporting text below as a natural
//                 lead-in to additional content. This content is a little bit
//                 longer.
//               </p>
//             </div>
//           </div>
//         </div>`;

//         return data;
//       });

//       pokemonList.innerHTML = lists.join("");
//     });
// };

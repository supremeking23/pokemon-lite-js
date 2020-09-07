function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const pokemonList = document.querySelector(".pokemon-list");

async function loadImage(url) {
  const pokemon = await fetch(url);
  const pokemon_data = await pokemon.json();

  return pokemon_data.sprites.other["official-artwork"].front_default;
}

const getType = async (url) => {
  const pokemon = await fetch(url);
  const pokemon_data = await pokemon.json();
  return await Promise.all(
    pokemon_data.types.map((t) => {
      return t.type.name;
    })
  );
};

//console.log(getType(`https://pokeapi.co/api/v2/pokemon/2/`));

async function getAllPokemon() {
  //https://pokeapi.co/api/v2/pokemon?limit=200&offset=500
  //
  const pokemons = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=200&offset=500`
  );
  const pokemon_data = await pokemons.json();

  let lists = await Promise.all(
    pokemon_data.results.map(async (pokemon) => {
      let image = await loadImage(pokemon.url);
      let [type1, type2] = await getType(pokemon.url);
      let bg = "";
      let bgtype1 = "";
      let bgtype2 = "";
      if (type1 == "fire") {
        bg = "#ff4422"; //#FF6144
        bgtype1 = "#FF6144";
      } else if (type1 == "water") {
        bg = "#0EBFE9";
        bgtype1 = "#66CCFF";
      } else if (type1 == "grass") {
        bg = "	#32CD32";
        bgtype1 = "#8CD36A";
      } else if (type1 == "flying") {
        bg = "#8899FF";
        bgtype1 = "#66CCFF";
      } else if (type1 == "bug") {
        bg = " #AABB22";
        bgtype1 = "#8CD750";
      } else if (type1 == "normal") {
        bg = "#BFBFBF";
        bgtype1 = "#B7B6A4";
      } else if (type1 == "dark") {
        bg = "#8C6F61";
        bgtype1 = "#8C6F61";
      }

      if (type2 == "fire") {
        bgtype2 = "#FF6144";
      } else if (type2 == "water") {
        bgtype2 = "#66CCFF";
      } else if (type2 == "grass") {
        bgtype2 = "#8CD36A";
      } else if (type2 == "flying") {
        bgtype2 = "#8899FF";
      } else if (type2 == "poison") {
        bgtype2 = "#EE99EE";
      }

      let data = `
              <div class="col mb-4">
              <div class="card">
              <div id="poke-container" class="d-flex flex-column align-items-center justify-content-center pokemon-img-container " style="background:${bg}">
    
              <img src="${image}"
              class="card-img-top pokemon-img" alt="..." />
              <div class="d-flex ${
                type2 ? `justify-content-between` : `justify-content-center`
              } type-container">
              
                <span class="type" style="background: ${bgtype1}">${capitalize(
        type1
      )}</span>
                ${
                  type2
                    ? `<span class="type " style="background: ${bgtype2}">${capitalize(
                        type2
                      )}</span>`
                    : ""
                }
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

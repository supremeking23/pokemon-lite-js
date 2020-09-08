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
      } else if (type1 == "poison") {
        bg = "#8D4690";
        bgtype1 = "#EE99EE";
      } else if (type1 == "bug") {
        bg = " #AABB22";
        bgtype1 = "#8CD750";
      } else if (type1 == "normal") {
        bg = "#BFBFBF";
        bgtype1 = "#B7B6A4";
      } else if (type1 == "dark") {
        bg = "#352E27";
        bgtype1 = "#8C6F61";
      } else if (type1 == "psychic") {
        bg = "#D24F7B";
        bgtype1 = "#FF5599";
      } else if (type1 == "electric") {
        bg = "#FEB820";
        bgtype1 = "#FFDD57";
      } else if (type1 == "rock") {
        bg = "#A29045";
        bgtype1 = "#BBAA66";
      } else if (type1 == "ground") {
        bg = " #C8A955";
        bgtype1 = "#DDBB55";
      } else if (type1 == "fighting") {
        bg = "#813418";
        bgtype1 = "#C56F61";
      } else if (type1 == "ghost") {
        bg = "#4D4D8C";
        bgtype1 = "#7D7DC5";
      } else if (type1 == "ice") {
        bg = "#6ACFE9";
        bgtype1 = "#7DD4FF";
      } else if (type1 == "steel") {
        bg = "#8E8CA0";
        bgtype1 = "#B7B7C5";
      } else if (type1 == "dragon") {
        bg = "#685BB0";
        bgtype1 = "#8C7DF1";
      } else if (type1 == "fairy") {
        bg = "#E09EDA";
        bgtype1 = "#F1A9F1";
      }

      //type 2

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
      } else if (type2 == "bug") {
        bgtype2 = "#8CD750";
      } else if (type2 == "normal") {
        bgtype2 = "#B7B6A4";
      } else if (type2 == "dark") {
        bgtype2 = "#8C6F61";
      } else if (type2 == "psychic") {
        bgtype2 = "#FF5599";
      } else if (type2 == "electric") {
        bgtype2 = "#FFDD57";
      } else if (type2 == "rock") {
        bgtype2 = "#BBAA66";
      } else if (type2 == "ground") {
        bgtype2 = "#DDBB55";
      } else if (type2 == "fighting") {
        bgtype2 = "#C56F61";
      } else if (type2 == "ghost") {
        bgtype2 = "#7D7DC5";
      } else if (type2 == "ice") {
        bgtype2 = "#7DD4FF";
      } else if (type2 == "steel") {
        bgtype2 = "#B7B7C5";
      } else if (type2 == "dragon") {
        bgtype2 = "#8C7DF1";
      } else if (type2 == "fairy") {
        bgtype2 = "#F1A9F1";
      }

      let data = `
              <div class="col mb-4">
              <div class="card">
              <div id="poke-container" class="d-flex flex-column align-items-center justify-content-center pokemon-img-container " style="background:${bg}">
    
              <img src="${image}"
              class="card-img-top pokemon-img" alt="${capitalize(
                pokemon.name
              )}" />
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

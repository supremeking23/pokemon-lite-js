//variables
const nationalId = document.querySelector(".national-id");
const pokemonType = document.querySelector(".type-row");
const pokemonHeight = document.querySelector(".height");
const pokemonWeight = document.querySelector(".weight");
const primaryAbility = document.querySelector(".primary-ability");
const hiddenAbility = document.querySelector(".hidden-ability");
const statsTable = document.querySelector(".stats-body");
const baseExperience = document.querySelector(".base-experience");
const moveSetTable = document.querySelector(".move-set-table");
const flavorTextEntries = document.querySelector(".flavor-text-entries");
const captureRate = document.querySelector(".capture-rate");
const pokemonColor = document.querySelector(".pokemon-color");
const evolvesFromEpecies = document.querySelector(".evolves-from-species");
const habitat = document.querySelector(".habitat");

//species
const base_hapiness = document.querySelector(".base-hapiness");

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getAllPokemon = async (url) => {
  const data = await fetch(url);
  const json_data = await data.json();
  return json_data;
};

const getPokemon = async (url) => {
  const data = await fetch(url);
  const json_data = await data.json();
  return json_data;
};

const getStats = async (stats) => {
  return await Promise.all(
    stats.map((stat) => {
      return stat.base_stat;
    })
  );
};

// async function load(getPokemonURL) {
//   let pokemon = await getPokemon(getPokemonURL);
//   //console.log(pokemon);
//   return pokemon;
// }

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const pokemonURL = urlParams.get("pokemon");
console.log(pokemonURL);

const fetchData = async () => {
  let response = await getPokemon(pokemonURL);
  //console.log(response);
  await loadDetail(response);
};

const getType = async (types) => {
  return await Promise.all(
    types.map((t) => {
      return t.type.name;
    })
  );
};

const getAbility = async (abilities) => {
  return await Promise.all(
    abilities.map((ability) => {
      return ability.ability.name;
    })
  );
};

const getMoveDetail = async (url) => {
  const data = await fetch(url);
  const move_details = await data.json();
  return move_details;
};

const getSpeciesDetail = async (url) => {
  const data = await fetch(url);
  const species_details = await data.json();
  return species_details;
};

const loadDetail = async (data) => {
  let detail = await data;
  let [type1, type2] = await getType(detail.types);
  let [ability1, ability2] = await getAbility(detail.abilities);

  if (type1 == "fire") {
    bgtype1 = "#FF6144";
  } else if (type1 == "water") {
    bgtype1 = "#66CCFF";
  } else if (type1 == "grass") {
    bgtype1 = "#8CD36A";
  } else if (type1 == "flying") {
    bgtype1 = "#66CCFF";
  } else if (type1 == "poison") {
    bgtype1 = "#EE99EE";
  } else if (type1 == "bug") {
    bgtype1 = "#8CD750";
  } else if (type1 == "normal") {
    bgtype1 = "#B7B6A4";
  } else if (type1 == "dark") {
    bgtype1 = "#8C6F61";
  } else if (type1 == "psychic") {
    bgtype1 = "#FF5599";
  } else if (type1 == "electric") {
    bgtype1 = "#FFDD57";
  } else if (type1 == "rock") {
    bgtype1 = "#BBAA66";
  } else if (type1 == "ground") {
    bgtype1 = "#DDBB55";
  } else if (type1 == "fighting") {
    bgtype1 = "#C56F61";
  } else if (type1 == "ghost") {
    bgtype1 = "#7D7DC5";
  } else if (type1 == "ice") {
    bgtype1 = "#7DD4FF";
  } else if (type1 == "steel") {
    bgtype1 = "#B7B7C5";
  } else if (type1 == "dragon") {
    bgtype1 = "#8C7DF1";
  } else if (type1 == "fairy") {
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

  // let [hp, attack] = await getStats(detail.stats);
  console.log(detail);
  document.querySelector(
    "#pokemon"
  ).innerHTML += `<img class="img-fluid" src="${detail.sprites.other["official-artwork"].front_default}">`;

  nationalId.innerHTML = `<strong>#${detail.id
    .toString()
    .padStart(3, "0")}</strong>`;

  pokemonType.innerHTML = `<span class="type-bg" style="background: ${bgtype1}">${capitalize(
    type1
  )}</span> ${
    type2
      ? `<span class="type-bg" style="background:${bgtype2}">${capitalize(
          type2
        )}</span>`
      : ""
  }`;
  //type2 ? '<span class="type">${capitalize(type2)}</span>' : ""
  pokemonHeight.innerHTML = `${detail.height} meters`;
  pokemonWeight.innerHTML = `${detail.weight} grams`;
  primaryAbility.innerHTML = `${capitalize(ability1)}`;
  hiddenAbility.innerHTML = `${capitalize(ability2)}`;
  baseExperience.innerHTML = `${detail.base_experience}`;

  detail.stats.forEach((stat) => {
    console.log(stat.stat.name);
  });

  let base_stat_summary = detail.stats.map((stat) => {
    let bg = "";
    if (stat.base_stat < 50) {
      bg = "bg-danger";
    } else if (stat.base_stat >= 51 && stat.base_stat <= 80) {
      bg = "bg-warning";
    } else if (stat.base_stat >= 81) {
      bg = "bg-success";
    }
    let data = `
    <tr>
            <td class="details text-right">${capitalize(stat.stat.name)}</td>
            <td class="hp-base-stat">${stat.base_stat}</td>
            <td width="75%">
              <div class="progress ">
                <div
                  class="progress-bar progress-bar-striped progress-bar-animated ${bg}"
                  role="progressbar"
                  style="width: ${stat.base_stat}%"
                  aria-valuenow="${stat.base_stat}"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </td>
    </tr>`;

    return data;
  });

  statsTable.innerHTML += base_stat_summary.join("");

  let move_set_list = await Promise.all(
    detail.moves.map(async (move) => {
      let moveDetail = await getMoveDetail(move.move.url);
      // console.log(moveDetail);

      let bgmove = "";
      if (moveDetail.type.name == "fire") {
        bgmove = "#FF6144";
      } else if (moveDetail.type.name == "water") {
        bgmove = "#66CCFF";
      } else if (moveDetail.type.name == "grass") {
        bgmove = "#8CD36A";
      } else if (moveDetail.type.name == "flying") {
        bgmove = "#66CCFF";
      } else if (moveDetail.type.name == "poison") {
        bgmove = "#EE99EE";
      } else if (moveDetail.type.name == "bug") {
        bgmove = "#8CD750";
      } else if (moveDetail.type.name == "normal") {
        bgmove = "#B7B6A4";
      } else if (moveDetail.type.name == "dark") {
        bgmove = "#8C6F61";
      } else if (moveDetail.type.name == "psychic") {
        bgmove = "#FF5599";
      } else if (moveDetail.type.name == "electric") {
        bgmove = "#FFDD57";
      } else if (moveDetail.type.name == "rock") {
        bgmove = "#BBAA66";
      } else if (moveDetail.type.name == "ground") {
        bgmove = "#DDBB55";
      } else if (moveDetail.type.name == "fighting") {
        bgmove = "#C56F61";
      } else if (moveDetail.type.name == "ghost") {
        bgmove = "#7D7DC5";
      } else if (moveDetail.type.name == "ice") {
        bgmove = "#7DD4FF";
      } else if (moveDetail.type.name == "steel") {
        bgmove = "#B7B7C5";
      } else if (moveDetail.type.name == "dragon") {
        bgmove = "#8C7DF1";
      } else if (moveDetail.type.name == "fairy") {
        bgmove = "#F1A9F1";
      }
      let move_set = `
        <tr>
          <td>${capitalize(move.move.name)} </td>
          <td><span class="type" style="background:${bgmove}">${capitalize(
        moveDetail.type.name
      )}</span></td>
          <td>${moveDetail.accuracy ? moveDetail.accuracy : "--"}</td>
          <td>${moveDetail.power ? moveDetail.power : "--"}</td>
          <td>${moveDetail.pp}</td>
        </tr>
    `;

      return move_set;
    })
  );

  moveSetTable.innerHTML += move_set_list.join("");

  //Evolution
  let species_detail = await getSpeciesDetail(detail.species.url);
  base_hapiness.innerHTML = `${species_detail.base_happiness}`;
  flavorTextEntries.innerHTML = `${species_detail.flavor_text_entries[0].flavor_text}`;
  captureRate.innerHTML = `${species_detail.capture_rate} %`;
  pokemonColor.innerHTML = `${capitalize(species_detail.color.name)}`;
  evolvesFromEpecies.innerHTML = `${
    species_detail.evolves_from_species
      ? capitalize(species_detail.evolves_from_species.name)
      : `None`
  }`;
  habitat.innerHTML = `${capitalize(species_detail.habitat.name)}`;
  console.log(species_detail.base_happines);
};

window.onload = (event) => {
  console.log("page is fully loaded");

  // let url = window.location.href;
  // let searchParams = new URLSearchParams(url);
  // let getPokemonURL = searchParams.get(
  //   "http://127.0.0.1:5500/pokemon-details.html?pokemon"
  // );

  fetchData();
  //loadDetail(pokemonURL);
};

// call bootstrap tooltip
// $(function () {
//   $("body").tooltip({
//     selector: '[data-toggle="tooltip"]',
//     container: "body",
//   });
// });

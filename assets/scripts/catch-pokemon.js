// https://codepen.io/jocchann/pen/MyxedP

// DOM Variables
const randomPokemon = document.querySelector(".random-pokemon");
const wildPokemonName = document.querySelector(".wild-pokemon-name");
const anotherPokemon = document.querySelector(".another-pokemon");
const catchPokemon = document.querySelector(".btn-throw-pokeball");

//variables
let randomPokemonData;
const caughtPokemon = [];
let currentPokemon = "";

//lowDB

let adapter = new LocalStorage("db");
let db = low(adapter);
// db.set("pokemon", caughtPokemon).write();
//set defaults
db.defaults({ pokemons: [] }).write();

// let allcaught = db.read();
//allcaught.__wrapped__.pokemon[2]
// let size = db.get("pokemon").size().value();

////////////////FUNCTIONS
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const initialURL = `https://pokeapi.co/api/v2/pokemon`;

const getAllPokemon = async (url) => {
  const data = await fetch(url);
  const json_data = await data.json();
  return json_data;
};

const getPokemonDetail = async (url) => {
  const data = await fetch(url);
  const json_data = await data.json();
  return json_data;
};

const fetchData = async () => {
  const response = await getAllPokemon(initialURL);
  await randomPokemonAppear(response);
};

const generateRandomFunction = (allPokemonCount) => {
  let pokemonCountForPresentation = 900;
  return Math.floor(Math.random() * pokemonCountForPresentation); // allPokemonCount
};

const getType = async (url) => {
  const pokemon = await fetch(url);
  const pokemon_data = await pokemon.json();
  return await Promise.all(
    pokemon_data.types.map((t) => {
      return t.type.name;
    })
  );
};

const randomPokemonAppear = async (response) => {
  let data = await response;
  let allPokemonCount = data.count;
  let generateRandom = generateRandomFunction(allPokemonCount);
  let randomPokemonURL = `https://pokeapi.co/api/v2/pokemon/${generateRandom}`;
  randomPokemonData = await getPokemonDetail(randomPokemonURL);

  let [type1, type2] = await getType(randomPokemonURL);

  caughtPokemon.push(randomPokemonData.name);
  currentPokemon = randomPokemonData.name;

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

  // buttonAnotherPokemon.style.background = bg;
  // buttonAnotherPokemon.style.color = "#FFFFFF";

  wildPokemonName.innerHTML = `A wild ${capitalize(
    randomPokemonData.name
  )} appear !`;

  let appearPokemon = `
  <div class="col mb-4">
  <div class="card">
    <div id="poke-container" class="d-flex flex-column align-items-center justify-content-center pokemon-img-container ripple" style="background:${bg}">
        <img src="${
          randomPokemonData.sprites.other["official-artwork"].front_default
            ? randomPokemonData.sprites.other["official-artwork"].front_default
            : "./assets/images/no-image.png"
        }" class="card-img-top wild-pokemon-appear" alt="${
    randomPokemonData.name
  }" />
        

    </div>
  </div>
</div>
  `;
  randomPokemon.innerHTML = appearPokemon;
};

const pokeballItem = document.querySelector(".pokeball");
const throwMessage = document.querySelector(".throw");
const gotchaMessage = document.querySelector(".gotcha");
const successMessage = document.querySelector(".success");
// pokeballItem.classList.add("hideInit");

catchPokemon.addEventListener("click", function (e) {
  console.log("Throw Pokeball");

  // var star = document.querySelector(".star1");
  // var successMessage = document.querySelector(".success");
  // var gotchaMessage = document.querySelector(".gotcha");

  throwMessage.style.animation = "throwMessage 1s 1 steps(21, start)";

  throwMessage.style.animationFillMode = "forwards";

  // pokeballItem.style.opacity = "1";
  // pokeballItem.style.animationDelay = "1s";

  // pokeballItem.style.animation = "throwPokeballMovement 3s ";

  pokeballItem.classList.remove("hideInit");
  pokeballItem.classList.add("show");
  pokeballItem.classList.add("animate__fadeInUp");

  // pokeballItem.style.opacity = "0";

  // pokeballItem.style.opacity = "-5";

  const wildPokemonAppear = document.querySelector(".wild-pokemon-appear");
  wildPokemonAppear.style.animation = "pokemon-disappear 0.5s ease 1";
  wildPokemonAppear.style.animationDelay = "1s";
  wildPokemonAppear.style.animationFillMode = "forwards";

  setTimeout(() => {
    console.log("Change Open pokeball from open to close, add wiggle effect");
    catchPokemon.classList.add("disabled");
    anotherPokemon.classList.add("disabled");
    //pokeballItem.style.opacity = "0";

    pokeballItem.style.animation = "wiggle .5s ease 5";
    pokeballItem.style.animationDelay = "1s";
    pokeballItem.setAttribute("src", "./assets/images/pokeballOne.png");
    // pokeballItem.classList.remove("show");
    // pokeballItem.classList.remove("animate__fadeInUp");
    // pokeballItem.classList.add("hide");
  }, 1000 * 2); // Do the following after 2sec

  setTimeout(() => {
    //pokeballItem.style.opacity = "0";
    // pokeballItem.setAttribute("src", "./assets/images/pokeball.png");
    gotchaMessage.style.animation = "gotchaMessage 0.5s ease 1";
    gotchaMessage.style.animationDelay = "1s";
    gotchaMessage.style.animationFillMode = "forwards";
    successMessage.innerHTML += `${capitalize(currentPokemon)} was caught!`;
    successMessage.style.animation = "successMessage 0.5s ease 1";
    successMessage.style.animationFillMode = "forwards";
    successMessage.style.animationDelay = "2s";
    pokeballItem.classList.remove("show");
    pokeballItem.classList.add("hide");
    console.log("Gotcha Message and store to lowDB");
    db.get("pokemons").push(randomPokemonData).write();
    var gotchaSound = new Audio("./assets/sounds/gotcha.mp3");
    gotchaSound.play();
  }, 1000 * 5); // Do the following after 5 sec; 3sec difference from the last setTimeout Function

  setTimeout(() => {
    //pokeballItem.style.opacity = "0";
    location.reload();
  }, 1000 * 12); //Do the following after 12 sec; 7sec difference from the last setTimeout Function and 2 sec difference from the first timout
});

anotherPokemon.addEventListener("click", function () {
  fetchData();
});

fetchData(); //Initial Load

//load your pokemon here
const yourPokemon = [...db.get("pokemons").value()];
let yourPokemonmap = yourPokemon.map((yourpokemon) => {
  return yourpokemon;
});

console.log(yourPokemonmap);

// setInterval(() => {
//   // Do something every 5 seconds

//   fetchData();
// }, 1000 * 5);

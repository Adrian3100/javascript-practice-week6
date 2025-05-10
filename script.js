const https = require("https");

function fetchData(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", (err) => reject(err));
  });
}

async function fetchAll() {
  // Group 1
  const squirtle = await fetchData(
    "https://pokeapi.co/api/v2/pokemon/squirtle"
  );
  console.log(
    `Squirtle - Name: ${squirtle.name}, Base Exp: ${squirtle.base_experience}`
  );

  const pikachu = await fetchData("https://pokeapi.co/api/v2/pokemon/pikachu");
  const pikachuTypes = pikachu.types.map((t) => t.type.name).join(", ");
  console.log(`Pikachu - Name: ${pikachu.name}, Types: ${pikachuTypes}`);

  const eevee = await fetchData("https://pokeapi.co/api/v2/pokemon/eevee");
  const eeveeAbilities = eevee.abilities.map((a) => a.ability.name).join(", ");
  console.log(`Eevee - Name: ${eevee.name}, Abilities: ${eeveeAbilities}`);

  // Group 2
  const secondPokemon = await fetchData("https://pokeapi.co/api/v2/pokemon/2");
  console.log(`Second Pokémon - Name: ${secondPokemon.name}`);

  const berry = await fetchData("https://pokeapi.co/api/v2/berry/1");
  const flavor = berry.flavors[0]?.flavor.name || "No flavor found";
  console.log(`Berry - Name: ${berry.name}, Flavor: ${flavor}`);

  const item = await fetchData("https://pokeapi.co/api/v2/item/1");
  console.log(`Item - Name: ${item.name}, Cost: ${item.cost}`);

  // Group 3
  const ability = await fetchData("https://pokeapi.co/api/v2/ability/1");
  const effect =
    ability.effect_entries.find((e) => e.language.name === "en")?.effect ||
    "No effect found";
  console.log(`Ability - Name: ${ability.name}, Effect: ${effect}`);

  const itemData = await fetchData("https://pokeapi.co/api/v2/item/1");
  console.log(
    `Item - Name: ${itemData.name}, Category: ${itemdData.category.name}`
  );

  const ids = [1, 4, 7];
  for (const id of ids) {
    const pokemon = await fetchData(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const abilities = pokemon.abilities.map((a) => a.ability.name).join(", ");
    console.log(
      `Pokemon ID ${id} - Name: ${pokemon.name}, Abilities: ${abilities}`
    );
  }
}

fetchAll();

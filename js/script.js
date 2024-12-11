const URL = "https://pokeapi.co/api/v2/pokemon/"

const obtenerPokemones = async (cantidadPokemons) => {
    try {
        const respuesta = await fetch(URL + "?" + `limit=${cantidadPokemons}`);
        const estado = respuesta.status;
        if (estado !== 200) {
            throw new Error(`Codigo HTTP: ${estado}`);
        }
        const respuestaEnJson = await respuesta.json();
        const pokemonsNameUrl = respuestaEnJson.results;
        pokemonsNameImg = await Promise.all(pokemonsNameUrl.map(async (pokemon) => {
            const nombrePokemon = pokemon.name;
            const pokemonDetalle = await fetch(pokemon.url);
            const estado = pokemonDetalle.status;
            if (estado !== 200) {
                throw new Error(`Codigo HTTP: ${estado} al consultar al pokemon ${nombrePokemon}`);
            }
            const pokemonDetalleJson = await pokemonDetalle.json();
            const pokemonImgURL = pokemonDetalleJson.sprites.front_default
            return {
                nombre: nombrePokemon,
                imagen: pokemonImgURL
            }
        }))
        return pokemonsNameImg
    }
    catch (error) {
        console.error(`Ocurrio un error al consultar los pokemones: ${error}`)
    }
}

obtenerPokemones(20).then((arregloDeVeintePokemonsNameSprite) => mostrarPokemones(arregloDeVeintePokemonsNameSprite))

//Funcion para mostrar las cartas
function mostrarPokemones(arregloPokemonsNombreSprite) {
    console.log(arregloPokemonsNombreSprite)
    for (indice = 0; indice < arregloPokemonsNombreSprite.length; indice++) {
        pokemonNombreImagen = arregloPokemonsNombreSprite[indice];
        nombrePokemon = pokemonNombreImagen.nombre;
        imagenPokemon = pokemonNombreImagen.imagen;

        let divCard = document.createElement("div");
        divCard.className = "card";
        let imgElement = document.createElement("img");
        imgElement.className = "card__imagen"
        imgElement.setAttribute("src", imagenPokemon);
        imgElement.setAttribute("alt", `Sprite principal frontal del pokemon ${nombrePokemon}`);
        let h3Element = document.createElement("h3");
        h3Element.className = "card__nombre"
        h3Element.textContent = nombrePokemon;
        divCard.appendChild(imgElement);
        divCard.appendChild(h3Element);

        document.getElementById("cards-container").appendChild(divCard)
    }
}


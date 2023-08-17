const { listarPokemons, detalharPokemon } = require('utils-playground');

// trabalhar com pagina
const getPokemonsList = async (req, res) => {
    const { page } = req.query;
    const pokemons = await listarPokemons(page ?? 1);
    return res.json(pokemons.results);
}

const findPokemon = async (req, res) => {
    const { idOuNome } = req.params;
    const pokemon = await detalharPokemon(idOuNome);
    const { id, name, height, weight, base_experience, forms, abilities, species } = pokemon;

    return res.json({ id, name, height, weight, base_experience, forms, abilities, species });
}

module.exports = {
    getPokemonsList,
    findPokemon
}
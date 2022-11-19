const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonName = document.querySelector('.pokemon_name');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const btn_anterior = document.querySelector('.btn-anterior');
const btn_proximo = document.querySelector('.btn-proximo');

let vPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "buscando...";
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'block';

    const data = await fetchPokemon(pokemon);

    if (data && data.id <= 649){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        vPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Esse não existe :C';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
    
    input.value = '';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase()); //649 is the last image  
});

btn_proximo.addEventListener('click', () => {
    vPokemon ++;
    if (vPokemon > 649){
        vPokemon = 1;
    }
    renderPokemon(vPokemon);  
});

btn_anterior.addEventListener('click', () => {
    vPokemon --;
    if (vPokemon == 0){
        vPokemon = 649;
    }
    renderPokemon(vPokemon);  
});

renderPokemon(vPokemon);
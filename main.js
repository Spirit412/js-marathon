import Pokemon from "./pokemon.js";
import {random, damage, countBtn, generateLog, randomKick, outputLog} from "./utils.js";
import {pokemons} from "./pokemons.js";
// import {renderHP, renderHPLife, renderProgressHP} from "./render.js"


const pikachu = pokemons.find(item => item.name === 'Pikachu');
console.log(pikachu);


const $btn = document.getElementById('btn-kick');
const $btn_bonus = document.getElementById('btn-bonus-kick');


const player1 = new Pokemon ({
    ...pikachu,
    selectors: "player1",
});


const player2 = new Pokemon ({
    ...pikachu,
    selectors: "player2",
});

const $control = document.querySelector('.control');

player1.attacks.forEach( item => {
    console.log(item);
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.innerText = item.name;
    const btnCount = countBtn(item.maxCount, $btn)
    $btn.addEventListener('click', () =>{
        console.log('Click button', $btn.innerText);
        btnCount();
    } )
    $control.appendChild($btn);
} );


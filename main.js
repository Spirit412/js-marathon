import Pokemon from "./pokemon.js";
import {random, countBtn, generateLog, outputLog} from "./utils.js";
import {pokemons} from "./pokemons.js";
// import {renderHP, renderHPLife, renderProgressHP} from "./render.js"
//получаем индекс первого персонажа
const rnd1 = random([0, pokemons.length])
//получаем индекс второго персонажа
const rnd2 = random([0, pokemons.length])


const play1 = pokemons.find(item => item.name === pokemons[rnd1].name);
console.log(play1);

const play2 = pokemons.find(item => item.name === pokemons[rnd2].name);
const player1 = new Pokemon({
    ...play1,
    selectors: "player1",
});

console.log(player1);

const $elImg1 = document.getElementById(`img-${player1.selectors}`);
$elImg1.src = `${play1.img}`;

const player2 = new Pokemon({
    ...play2,
    selectors: "player2",
});

const $elImg2 = document.getElementById(`img-${player2.selectors}`);
$elImg2.src = `${play2.img}`;

const $control = document.querySelector('.control');

player1.attacks.forEach(item => {
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.innerText = item.name;
    const btnCount = countBtn(item.maxCount, $btn)
    $btn.addEventListener('click', () => {
        player1.changeHP(random([item.minDamage, item.maxDamage]), function (count) {
            outputLog(generateLog(player1, player2, count));
        });
        player2.changeHP(random([item.minDamage, item.maxDamage]), function (count) {
            outputLog(generateLog(player2, player1, count));
        });
        btnCount();
    })
    // Кнопки добавляются из БД первого игрока
    $control.appendChild($btn);
});
player2.attacks.forEach(item => {
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.innerText = item.name;
    const btnCount = countBtn(item.maxCount, $btn)
    $btn.addEventListener('click', () => {
        player1.changeHP(random([item.minDamage, item.maxDamage]), function (count) {
            outputLog(generateLog(player1, player2, count));
        });
        player2.changeHP(random([item.minDamage, item.maxDamage]), function (count) {
            outputLog(generateLog(player2, player1, count));
        });
        btnCount();
    })
});
// $control.appendChild($btn);


const $renderName1 = document.getElementById('name-player1');
$renderName1 .innerText = `${player1.name}`;

const $renderName2 = document.getElementById('name-player2');
$renderName2 .innerText = `${player2.name}`;


// const thunder_jolt_kick = countBtn(6, $btn);
// $btn.addEventListener('click', function () {
//     thunder_jolt_kick();
//     Player1.changeHP(random(damage[randomKick(damage)]), function (count) {
//         outputLog(generateLog(Player1, Player2, count));
//     });
//     Player2.changeHP(random(damage[randomKick(damage)]), function (count) {
//         outputLog(generateLog(Player2, Player1, count));
//     });
// });
//
//
// const bonus_kick = countBtn(2, $btn_bonus);
// $btn_bonus.addEventListener('click', function () {
//     bonus_kick();
//     Player1.changeHP(random(damage.high), function (count) {
//         outputLog(generateLog(Player1, Player2, count));
//     });
//     Player2.changeHP(random(damage.high), function (count) {
//         outputLog(generateLog(Player2, Player1, count));
//     });
// });
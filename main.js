import Pokemon from "./pokemon.js";
import {random, damage, countBtn, generateLog, randomKick, outputLog} from "./utils.js";
// import {renderHP, renderHPLife, renderProgressHP} from "./render.js"

const $btn = document.getElementById('btn-kick');
const $btn_bonus = document.getElementById('btn-bonus-kick');


const Player1 = new Pokemon ({
    name: 'Picachu',
    selectors: "character",
    type: 'electric',
    defaultHP: 230,
});


const Player2 = new Pokemon ({
    name: 'Charmander',
    type: 'fire',
    selectors: 'enemy',
    defaultHP: 160,
});

function init() {
    random(damage[randomKick(damage)]);
}

const thunder_jolt_kick = countBtn(6, $btn);
$btn.addEventListener('click', function () {
    thunder_jolt_kick();
    Player1.changeHP(random(damage[randomKick(damage)]), function (count) {
        outputLog(generateLog(Player1, Player2, count));
    });
    Player2.changeHP(random(damage[randomKick(damage)]), function (count) {
        outputLog(generateLog(Player2, Player1, count));
    });
});


const bonus_kick = countBtn(2, $btn_bonus);
$btn_bonus.addEventListener('click', function () {
    bonus_kick();
    Player1.changeHP(random(damage.high), function (count) {
        outputLog(generateLog(Player1, Player2, count));
    });
    Player2.changeHP(random(damage.high), function (count) {
        outputLog(generateLog(Player2, Player1, count));
    });
});

init();
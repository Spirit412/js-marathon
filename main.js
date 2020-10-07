import Pokemon from "./pokemon.js";
import {random, damage, countBtn, generateLog, randomKick} from "./utils.js";
import {renderHP, renderHPLife, renderProgressHP} from "./render.js"

const $btn = $getElById('btn-kick');
const $btn_bonus = $getElById('btn-bonus-kick');



const character = new Pokemon ({
    name: 'Picachu',
    type: 'electric',
    defaultHP: 160,
    elHP: $getElById('health-character'),
    elProgressBar: $getElById('progressbar-character'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressHP: renderProgressHP,
});

console.log(character)

const enemy = new Pokemon ({
    name: 'Charmander',
    type: 'fire',
    defaultHP: 160,
    elHP: $getElById('health-enemy'),
    elProgressBar: $getElById('progressbar-enemy'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressHP: renderProgressHP,
});

function $getElById(id) {
    return document.getElementById(id)
}






const thunder_jolt_kick = countBtn(6, $btn);
$btn.addEventListener('click', function () {
    const count_kick = thunder_jolt_kick();
    character.changeHP(random(damage[randomKick(damage)]));
    enemy.changeHP(random(damage[randomKick(damage)]));
})


const bonus_kick = countBtn(2, $btn_bonus);
$btn_bonus.addEventListener('click', function () {
    const count_bonus_kick = bonus_kick();
    character.changeHP(random(damage.high));
    enemy.changeHP(random(damage.high));
})

/**
 * @function функция инициализации игры при стартк
 */
function init() {
    console.log('Start game!');
    character.renderHPLife();
    enemy.renderHPLife();
    character.renderProgressHP();
    enemy.renderProgressHP();
    character.changeHP;
    enemy.changeHP;

}


/**
 * @param {number}  count число на которое уменьшается damageHP объекта
 */
function changeHP(count) {
    this.damageHP -= count;

    const log = this === enemy ? generateLog(this, character, count, this.damageHP) : generateLog(this, enemy, count, this.damageHP);

    const $logBattle = document.querySelector('#logBatle');
    const $p = document.createElement('p');

    $p.innerHTML = `${log}`;

    $logBattle.insertBefore($p, $logBattle.children[0]);

    if (this.damageHP <= 0) {
        $btn.disabled = true;
        $btn_bonus.disabled = true;
        this.damageHP = 0;
        alert(`${this.name} - Game over!`)
    }
    this.renderHP();
}


init();
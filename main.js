const $btn = $getElById('btn-kick');
const $btn_bonus = $getElById('btn-bonus-kick');
const KICK_START = 2;

/**
 * @param {damage} разный диапазон повреждения
 */
const damage = {
    normal: [0, 10],
    middle: [5, 20],
    high: [20, 50],
};

const character = {
    name: 'Picachu',
    defaultHP: 160,
    damageHP: 160,
    elHP: $getElById('health-character'),
    elProgressBar: $getElById('progressbar-character'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressHP: renderProgressHP,
};
const enemy = {
    name: 'Charmander',
    defaultHP: 160,
    damageHP: 160,
    elHP: $getElById('health-enemy'),
    elProgressBar: $getElById('progressbar-enemy'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressHP: renderProgressHP,
};

function $getElById(id){ 
    return document.getElementById(id)
}


/**
 * @param randomKick - Используя объект damage и функцию random, получаем рандомно тип удара и его диапазон
 */
function randomKick(obj){
    const [...argKeyDam] = Object.keys(obj);
    const kick = argKeyDam[random([0, argKeyDam.length])];
    return kick;
}


function countKickUp(){
    let n = 0;
    return function () {
        n += 1;
        return n;
    }
}

/**
 * @function countKickDown - функция подсчёта оставшихся кликов
 * @param KICK_START - заданная конствнта максимального количества кликов
 */
function countKickDown(){
    let startCount = KICK_START;
    return function () {
        startCount -= 1;
        if (startCount <= 0) {
            console.log()
            return 0;
        }
        return startCount;
    }
}


const thunder_jolt_kick = countKickUp();

$btn.addEventListener('click', function () {
    const count_kick = thunder_jolt_kick();
    document.querySelector('#btn-kick').innerText = `Thunder Jolt ${count_kick}`;
    character.changeHP(random(damage[randomKick(damage)]));
    enemy.changeHP(random(damage[randomKick(damage)]));
    console.log(`Всего нажатий на кнопку "Thunder Jolt":${count_kick}`);
})


const kick_bonus = countKickDown();

$btn_bonus.addEventListener('click', function () {
    const count_bonus_kick = kick_bonus();
    if (count_bonus_kick <= 0){
        $btn_bonus.disabled = true;
    }
    document.querySelector('#btn-bonus-kick').innerText = `Bonus kick! ${count_bonus_kick} из ${KICK_START}`;
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
    document.querySelector('#btn-kick').innerText = `Thunder Jolt 0`;
    document.querySelector('#btn-bonus-kick').innerText = `Bonus kick! ${KICK_START} из ${KICK_START}`;

}

function renderHP() {
    this.renderHPLife();
    this.renderProgressHP();
}

function renderHPLife() {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
}

/**
 * @function renderProgressHP функция рендера прогрессбара жизней.
 * Вызывается через методы объектов.
 * @this {Object}
 */
function renderProgressHP() {
    const progressHP = (this.damageHP / this.defaultHP) * 100;
    if (progressHP < 25) {
        this.elProgressBar.style.background = '#d20000'
        this.elProgressBar.style.width = progressHP + '%'
    } else {
        this.elProgressBar.style.width = progressHP + '%'
    }
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
        alert(`${this.name} - Game over!`)
        this.damageHP = 0;
    }
    this.renderHP();
}


/**
 * @param {number[]} minmax принимает массив двух чисел? как диапазона в котором генерируется число
 */
function random(minmax) {
    // minmax[0] - min
    // minmax[1] - max
    let result = 0;
    if (minmax[0] === 0) {
        //тут кажется уместнее использовать Math.floor
        result = Math.floor(Math.random() * minmax[1]);
    } else {
        result = Math.ceil(Math.random() * (minmax[1] - minmax[0] + 1)) + minmax[0];
    }
    return result;
}


function generateLog(firstPerson, secondPerson, count) {
    const logs = [
        `<span class="colortextFirstPerson">${firstPerson.name} </span> вспомнил что-то важное, но неожиданно <span class="colortextSecondPerson"> ${secondPerson.name} </span> , не помня себя от испуга, ударил в предплечье врага. - ${count}. Осталось ${firstPerson.damageHP}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> поперхнулся, и за это <span class="colortextSecondPerson"> ${secondPerson.name} </span>  с испугу приложил прямой удар коленом в лоб врага. - ${count}. Осталось ${firstPerson.damageHP}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> забылся, но в это время наглый <span class="colortextSecondPerson"> ${secondPerson.name} </span> , приняв волевое решение, неслышно подойдя сзади, ударил. - ${count}. Осталось ${firstPerson.damageHP}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> пришел в себя, но неожиданно <span class="colortextSecondPerson"> ${secondPerson.name} </span>  случайно нанес мощнейший удар. - ${count}. Осталось ${firstPerson.damageHP}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> поперхнулся, но в это время <span class="colortextSecondPerson"> ${secondPerson.name} </span>  нехотя раздробил кулаком \<вырезанно цензурой\> противника. - ${count}. Осталось ${firstPerson.damageHP}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> удивился, а <span class="colortextSecondPerson">${secondPerson.name} </span>  пошатнувшись влепил подлый удар. - ${count}. Осталось ${firstPerson.damageHP}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> высморкался, но неожиданно <span class="colortextSecondPerson"> ${secondPerson.name} </span>  провел дробящий удар. - ${count}. Осталось ${firstPerson.damageHP}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> пошатнулся, и внезапно наглый <span class="colortextSecondPerson"> ${secondPerson.name} </span>  беспричинно ударил в ногу противника. - ${count}. Осталось ${firstPerson.damageHP}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> расстроился, как вдруг, неожиданно <span class="colortextSecondPerson"> ${secondPerson.name} </span>  случайно влепил стопой в живот соперника. - ${count}. Осталось ${firstPerson.damageHP}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> пытался что-то сказать, но вдруг, неожиданно <span class="colortextSecondPerson"> ${secondPerson.name} </span>  со скуки, разбил бровь сопернику. - ${count}. Осталось ${firstPerson.damageHP}`
    ];
    return logs[random([0, logs.length-1])]
    // return logs[random([0, 1])]
}





init();
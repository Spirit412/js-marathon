const $btn = $getElById('btn-kick');







/**
 * @param {damage} разный диапазон повреждения
 */
const damage = {
    normal: [0, 10],
    middle: [5, 20],
    high: [15, 30],
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
    // return random([0, argKeyDam.length])
    // console.log(argKeyDam.length);
    const kick = argKeyDam[random([0, argKeyDam.length])];
    return kick;
}

// console.log(damage[randomKick(damage)]);


$btn.addEventListener('click', function () {
    let kick = random(damage[randomKick(damage)]);
    character.changeHP(kick);
    console.log(`Повреждение ${character.name} = - ${kick}, осталось ${character.damageHP}`);
    kick = random(damage[randomKick(damage)]);
    enemy.changeHP(kick);
    console.log(`Повреждение ${enemy.name} = - ${kick}, осталось ${enemy.damageHP}`);
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


    console.log(log);

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
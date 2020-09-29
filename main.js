const $btn = document.getElementById('btn-kick');

//разный диапазон повреждения
const damage = {
    normal: [0, 10],
    midle: [5, 20],
    high: [15, 30],
}

const character = {
    name: 'Picachu',
    defaultHP: 160,
    damageHP: 160,
    elHP: document.getElementById('health-character'),
    elProgressBar: document.getElementById('progressbar-character'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressHP: renderProgressHP,
}
const enemy = {
    name: 'Charmander',
    defaultHP: 160,
    damageHP: 160,
    elHP: document.getElementById('health-enemy'),
    elProgressBar: document.getElementById('progressbar-enemy'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressHP: renderProgressHP,
}

// console.log(enemy.changeHP(random(damage.normal)));
// console.log(random(damage.normal));

$btn.addEventListener('click', function () {
    console.log('Kick');
    //FIX Удар для обоих персонажей сделан отдельно рандомным.
    character.changeHP(random(damage.normal));
    enemy.changeHP(random(damage.normal));
    character.renderHPLife()
    enemy.renderHPLife()
    character.renderProgressHP()
    enemy.renderProgressHP()
})

/**
 * @function функция инициализации игры при стартк
 */
function init() {
    console.log('Start game!');
    // }
    //TODO кнопку через js. т.к. вероятно в дальнейшем по функционалу можно будет для разных файтингов делать разный набор кнопок
    //     const _ = document.getElementById('control');
    //     _.innerHTML = '<button class="button" id="btn-kick2">Fatality Kick!!!</button>\n' +
    //             '            <button class="button" id="btn-kick">Thunder Jolt</button>';
    character.renderHPLife();
    enemy.renderHPLife();
    character.renderProgressHP();
    enemy.renderProgressHP();
    character.changeHP;
    enemy.changeHP;
}

function renderHP() {
    this.renderHPLife;
    this.renderProgressHP;
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
    if (this.damageHP < count) {
        alert(`${this.name} - Game over!`);
        $btn.disabled = true;
        console.debug($btn.disabled)
        this.damageHP = 0;
    } else {
        this.damageHP -= count;
    }
}


/**
 * @param {number[]} minmax принимает массив двух чисел диапазона в котором генерируется число
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

init();
const $btn = document.getElementById('btn-kick');

//разный диапазон повреждения
const damage = {
    normal: [0 , 10],
    midle:[5,20],
    high:[15,30],
}

const character = {
    name: 'Picachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressBar: document.getElementById('progressbar-character'),
}
const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressBar: document.getElementById('progressbar-enemy'),
}

$btn.addEventListener('click', function () {
    console.log('Kick');
    //FIX Удар для обоих персонажей сделан отдельно рандомным.
    changeHP(random(damage.normal), character);
    changeHP(random(damage.normal), enemy);
})

function init() {
    console.log('Start game!');
    console.dir(damage);
    // }
        //TODO кнопку через js. т.к. вероятно в дальнейшем по функционалу можно будет для разных файтингов делать разный набор кнопок
        //     const _ = document.getElementById('control');
        //     _.innerHTML = '<button class="button" id="btn-kick2">Fatality Kick!!!</button>\n' +
        //             '            <button class="button" id="btn-kick">Thunder Jolt</button>';
    renderHP(character);
    renderHP(enemy);
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressHP(person) {
    person.elProgressBar.style.width = person.damageHP + '%';
}

function changeHP(count, person) {
    if (person.damageHP < count){
        person.damageHP = 0;
        alert(`${person.name} - Game over!`)
        $btn.disable = true;
    } else {
    person.damageHP -= count;
    }
    renderHP(person);
}


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

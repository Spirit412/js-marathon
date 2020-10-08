/**
 * @param {number[]} minmax принимает массив двух чисел? как диапазона в котором генерируется число
 */
export function random(minmax) {
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




/**
 * @function countBtn функция-счетчик
 * @param count количество нажатий на кнопку
 * @param el элемент DOM
 */
export function countBtn(countKick = 6, el) {
    const innerText = el.innerText;
    el.innerText = `${innerText} (${countKick})`
    return function () {
        countKick--;
        if (countKick === 0)
            el.disabled = true;
        el.innerText = `${innerText} (${countKick})`;
        return countKick;
    }
}

// /**
//  * @param randomKick - Используя объект damage и функцию random, получаем рандомно тип удара и его диапазон
//  */
// export function randomKick(obj) {
//     const [...argKeyDam] = Object.keys(obj);
//     const kick = argKeyDam[random([0, argKeyDam.length])];
//     return kick;
// }

export function outputLog(log) {
    const $battle_log = document.querySelector('#logBatle')
    const $p = document.createElement('p');

    $p.innerHTML = `${log}`;
    $battle_log.insertBefore($p, $battle_log.children[0]);
}


export function generateLog(firstPerson, secondPerson, count) {
    const logs = [
        `<span class="colortextFirstPerson">${firstPerson.name} </span> вспомнил что-то важное, но неожиданно <span class="colortextSecondPerson"> ${secondPerson.name} </span> , не помня себя от испуга, ударил в предплечье врага. - ${count}. Осталось ${firstPerson.hp.current}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> поперхнулся, и за это <span class="colortextSecondPerson"> ${secondPerson.name} </span>  с испугу приложил прямой удар коленом в лоб врага. - ${count}. Осталось ${firstPerson.hp.current}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> забылся, но в это время наглый <span class="colortextSecondPerson"> ${secondPerson.name} </span> , приняв волевое решение, неслышно подойдя сзади, ударил. - ${count}. Осталось ${firstPerson.hp.current}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> пришел в себя, но неожиданно <span class="colortextSecondPerson"> ${secondPerson.name} </span>  случайно нанес мощнейший удар. - ${count}. Осталось ${firstPerson.hp.current}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> поперхнулся, но в это время <span class="colortextSecondPerson"> ${secondPerson.name} </span>  нехотя раздробил кулаком \<вырезанно цензурой\> противника. - ${count}. Осталось ${firstPerson.hp.current}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> удивился, а <span class="colortextSecondPerson">${secondPerson.name} </span>  пошатнувшись влепил подлый удар. - ${count}. Осталось ${firstPerson.hp.current}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> высморкался, но неожиданно <span class="colortextSecondPerson"> ${secondPerson.name} </span>  провел дробящий удар. - ${count}. Осталось ${firstPerson.hp.current}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> пошатнулся, и внезапно наглый <span class="colortextSecondPerson"> ${secondPerson.name} </span>  беспричинно ударил в ногу противника. - ${count}. Осталось ${firstPerson.hp.current}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> расстроился, как вдруг, неожиданно <span class="colortextSecondPerson"> ${secondPerson.name} </span>  случайно влепил стопой в живот соперника. - ${count}. Осталось ${firstPerson.hp.current}`,
        `<span class="colortextFirstPerson">${firstPerson.name} </span> пытался что-то сказать, но вдруг, неожиданно <span class="colortextSecondPerson"> ${secondPerson.name} </span>  со скуки, разбил бровь сопернику. - ${count}. Осталось ${firstPerson.hp.current}`
    ];
    return logs[random([0, logs.length - 1])]
}

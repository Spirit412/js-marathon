import {random, countBtn, generateLog, outputLog} from "./utils.js";
import Pokemon from "./pokemon.js";

class Game {

    getPokemons = async () => {
        const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons');
        const body = await response.json();
        return body;

    }

    start = async () => {
        const pokemons = await this.getPokemons();


        function getRandDataPokemon(in_arr) {
            const getID = random([0, in_arr.length - 1]);
            return in_arr.find(item => item.name === in_arr[getID].name);
        }

        let player1 = new Pokemon({
            ...getRandDataPokemon(pokemons),
            selectors: "player1",
        });

        let player2 = new Pokemon({
            ...getRandDataPokemon(pokemons),
            selectors: "player2",
        });

        player1.renderCard();
        player2.renderCard();
        player1.playerAttacks(player2, player1);
        player2.playerAttacks(player1, player2);

        // const $renderName1 = document.getElementById('name-player1');
        //         $renderName1.innerText = `${player1.name}`;
        // const $renderName2 = document.getElementById('name-player2');
        //         $renderName2.innerText = `${player2.name}`;

        //
        //
        // let $control = document.querySelector('.control');
        // let $startBtn = document.createElement('button');
        // $startBtn.classList.add('button');
        // $startBtn.innerText = 'START GAME!!';
        // $control.appendChild($startBtn);
        //
        // await $startBtn.addEventListener('click', () => {
        //     $startBtn.remove();
        //
        //     function firstPerson() {
        //         const $elImg1 = document.getElementById(`img-${player1.selectors}`);
        //         $elImg1.src = `${play1.img}`;
        //
        //         const $renderName1 = document.getElementById('name-player1');
        //         $renderName1.innerText = `${player1.name}`;
        //
        //         player1.attacks.forEach(item => {
        //             let $btn = document.createElement('button');
        //             $btn.classList.add('button');
        //             $btn.innerText = item.name;
        //             const btnCount = countBtn(item.maxCount, $btn)
        //             $btn.addEventListener('click', () => {
        //                 let count = random([item.minDamage, item.maxDamage]);
        //                 // secondPerson.apply(player2.changeHP(firstPerson.apply(count));
        //                 player2.changeHP(count);
        //                 outputLog(generateLog(player2, player1, count));
        //                 btnCount();
        //             })
        //
        //             $control.appendChild($btn);
        //         });
        //
        //     }
        //
        //     function secondPerson() {
        //         //получаем индекс второго персонажа
        //         const rnd2 = random([0, pokemons.length - 1])
        //         const play2 = pokemons.find(item => item.name === pokemons[rnd2].name);
        //
        //
        //         const $elImg2 = document.getElementById(`img-${player2.selectors}`);
        //         $elImg2.src = `${play2.img}`;
        //
        //         const $renderName2 = document.getElementById('name-player2');
        //         $renderName2.innerText = `${player2.name}`;

        // player2.attacks.forEach(item => {
        //     let $btn = document.createElement('button');
        //     $btn.classList.add('button');
        //     $btn.innerText = item.name;
        //     const btnCount = countBtn(item.maxCount, $btn)
        //     $btn.addEventListener('click', () => {
        //         let count = random([item.minDamage, item.maxDamage]);
        //         player1.changeHP(count);
        //         outputLog(generateLog(player1, player2, count));
        //         btnCount();
        //     })
        //     $control.appendChild($btn);
        // });
        //
        //     }
        //
        //     firstPerson();
        //     secondPerson();
        //

    }
}


let $control = document.querySelector('.control');
let $startBtn = document.createElement('button');
$startBtn.classList.add('button');
$startBtn.innerText = 'START GAME!!';
$control.appendChild($startBtn);
$startBtn.addEventListener('click', () => {
    $startBtn.remove();


    const game = new Game();
    game.start()


});



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
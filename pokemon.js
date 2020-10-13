import {random, countBtn, generateLog, outputLog} from "./utils.js";

export default class Pokemon {
    constructor({ name, hp, type, img, selectors, attacks=[]}) {
        this.name = name;
        this.img = img;
        this.selectors = selectors;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.elHP = this.$getElById(`health-${this.selectors}`);
        this.elProgressBar = this.$getElById(`progressbar-${this.selectors}`);
        this.changeHP();
        this.attacks = attacks;
    }

    $getElById(id) {
        return document.getElementById(id)
    }

    /**
     * @function changeHP
     * @param damage число на которое уменьшается damageHP
     * @param cb
     */
    // changeHP = (damage, cb) => {
    //     if (damage === undefined)
    //         damage = 0;
    //     this.hp.current -= damage;
    //     if (this.hp.current <= 0) {
    //         // при 0 жизней у игрока, проходимся по кнопкам и отключаем их
    //         let btn = document.querySelectorAll('.button');
    //         btn.forEach($item => $item.disabled = true);
    //         this.hp.current = 0;
    //         alert(`${this.name} - Game over!`);
    //     }
    //
    //     this.renderHP();
    //     cb && cb(damage);
    // }

    async changeHP (damage) {
        //Что я не правильно делаю. На старте игры, damage = undefined. Это понятно, т.к. кнопка не нажата.
        // Победить не смог. Обошел через if
        if (damage === undefined)
            damage = 0;
        this.hp.current -= damage;
        if (this.hp.current <= 0) {
            // при 0 жизней у игрока, проходимся по кнопкам и отключаем их
            let btn = document.querySelectorAll('.button');
            btn.forEach($item => $item.disabled = true);
            this.hp.current = 0;
            alert(`${this.name} - Game over!`);
            this.constructor({...getRandDataPokemon(pokemons), selectors: "player1"})
        }
        this.renderHP();
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressHP();
    }

    renderHPLife = () => {
        const {elHP, hp: { current, total }} = this;
        elHP.innerText = `${current} / ${total}`;
    }

    renderProgressHP = () => {
        const {hp: { current, total }, elProgressBar} = this;
        const progressHP = current / (total/100);
        if (progressHP < 25) {
            elProgressBar.style.background = '#d20000'
            elProgressBar.style.width = `${progressHP}%`
        } else {
            elProgressBar.style.width = `${progressHP}%`
        }
    }

    renderCard = () => {
        const $renderName1 = document.getElementById(`name-${this.selectors}`);
        $renderName1.innerText = `${this.name}`;

        const $elImg = document.getElementById(`img-${this.selectors}`);
                $elImg.src = `${this.img}`;


    }

    playerAttacks = (player2, player1) => {
        this.attacks.forEach(item => {
            let $control = document.querySelector('.control');
            let $btn = document.createElement('button');
            $btn.classList.add('button');
            $btn.innerText = item.name;
            const btnCount = countBtn(item.maxCount, $btn)

            $btn.addEventListener('click', () => {
                let count = random([item.minDamage, item.maxDamage]);
                player2.changeHP(count);
                outputLog(generateLog(player2, player1, count));
                btnCount();
            })

            $control.appendChild($btn);
        });
    }




}
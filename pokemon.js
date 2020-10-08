import {generateLog} from "./utils.js";

export default class Pokemon {
    constructor({ name, hp, type, selectors, attacks=[]}) {
        this.name = name;
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
    changeHP = (damage, cb) => {
        if (damage === undefined)
            damage = 0;
        this.hp.current -= damage;

        if (this.hp.current <= 0) {
            $btn.disabled = true;
            $$btn_bonus.disabled = true;
            this.hp.current = 0;
            alert(`${this.name} - Game over!`);
        }

        this.renderHP();
        cb && cb(damage);
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

}
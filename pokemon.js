import {generateLog} from "./utils.js";

export default class Pokemon {
    constructor(props) {
        this.name = props.name;
        this.selectors = props.selectors;
        this.defaultHP = props.defaultHP;
        this.damageHP = this.defaultHP;
        this.type = props.type;
        this.elHP = this.$getElById(`health-${this.selectors}`);
        this.elProgressBar = this.$getElById(`progressbar-${this.selectors}`);
        this.changeHP();
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
        if (damage == undefined)
            damage = 0;
        this.damageHP -= damage;
        console.log(damage)

        console.log(this.damageHP);
        if (this.damageHP <= 0) {
            console.log(this)
            $btn.disabled = true;
            $$btn_bonus.disabled = true;
            this.damageHP = 0;
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
        const {elHP, damageHP, defaultHP} = this;
        elHP.innerText = damageHP + ' / ' + defaultHP;
    }

    renderProgressHP = () => {
        const {damageHP, defaultHP, elProgressBar} = this;
        const progressHP = damageHP / (defaultHP/100);
        if (progressHP < 25) {
            elProgressBar.style.background = '#d20000'
            elProgressBar.style.width = progressHP + '%'
        } else {
            elProgressBar.style.width = progressHP + '%'
        }
    }

}
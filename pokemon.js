export default class Pokemon {
    constructor(props) {
        this.name = props.name;
        this.defaultHP = props.defaultHP;
        this.damageHP = this.defaultHP;
        this.type = props.type;
        this.elHP = props.elHP;
        this.elProgressBar = props.elProgressBar;
        this.changeHP = props.changeHP;
        this.renderHP = props.renderHP;
        this.renderHPLife = props.renderHPLife;
        this.renderProgressHP = props.renderProgressHP;
    }
}
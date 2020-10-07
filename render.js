// export function renderHP() {
//     this.renderHPLife();
//     this.renderProgressHP();
// }
//
// export function renderHPLife() {
//     this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
// }
//
// /**
//  * @function renderProgressHP функция рендера прогрессбара жизней.
//  * Вызывается через методы объектов.
//  * @this {Object}
//  */
// export function renderProgressHP() {
//     const progressHP = (this.damageHP / this.defaultHP) * 100;
//     if (progressHP < 25) {
//         this.elProgressBar.style.background = '#d20000'
//         this.elProgressBar.style.width = progressHP + '%'
//     } else {
//         this.elProgressBar.style.width = progressHP + '%'
//     }
// }
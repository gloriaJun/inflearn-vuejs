import View from './View.js'


const tag = '[FormView]';

const FormView = Object.create(View);

FormView.setup = function (el) {
    this.init(el);
    this.inputEl = el.querySelector('[type=text]');
    this.resetEl = el.querySelector('[type=reset]');
    this.showResetBtn(false);
    this.bindEvents();
}

// 검색 버튼 제어 함수
FormView.showResetBtn = function (show = true) {
    this.resetEl.style.display = show ? 'block' : 'none';
}

FormView.bindEvents = function () {
    this.inputEl.addEventListener('keyup', e => this.onkeyup(e));
}

FormView.onkeyup = function () {
    this.showResetBtn(this.inputEl.value.length);
}

export default FormView;

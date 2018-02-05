import View from './View.js'

const tag = '[FormView]'

const FormView = Object.create(View)

FormView.setup = function (el) {
    this.init(el)
    this.inputEl = el.querySelector('[type=text]')
    this.resetEl = el.querySelector('[type=reset]')
    this.showResetBtn(false)
    this.bindEvents()

    return this
}

// 검색 버튼 제어 함수
FormView.showResetBtn = function (show = true) {
    this.resetEl.style.display = show ? 'block' : 'none'
}

// 이벤트 바인딩을 처리하는 함수
FormView.bindEvents = function () {
    this.on('submit', e => e.preventDefault());
    this.inputEl.addEventListener('keyup', e => this.onKeyup(e));
    this.resetEl.addEventListener('click', e => this.onClickReset(e));
}

// 입력폼에 입력 시 발생하는 이벤트 정의
FormView.onKeyup = function (e) {
    const enter = 13; // 엔터키의 키 값
    this.showResetBtn(this.inputEl.value.length);
    if (!this.inputEl.value.length) this.emit('@reset');
    if (e.keyCode !== enter) return;
    this.emit('@submit', { input: this.inputEl.value });
}

// x 버튼 클릭에 대한 이벤트 정의 - html reset 버튼 속성이므로 기본적으로 폼을 초기화하도록 동작이 된다.
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/reset
FormView.onClickReset = function (e) {
    // 아래의 주석 코드는 만약, reset 타입의 버튼이 아닌 경우라면 필요시 별도로 구현이 필요한 부분임
    // this.showResetBtn(false);
    // this.inputEl.value = ''
    this.emit('@reset');
}

export default FormView;

import View from './View.js'

const tag = '[KeywordView]';

const KeywordView = Object.create(View);

KeywordView.setup = function (el) {
    this.init(el)
    return this;
}

KeywordView.render = function (data = []) {
    this.el.innerHTML = data.length ? this.getKeywordHtml(data) : '추천 검색어가 없습니다.';
    this.show();

    this.bindEvents();
}

KeywordView.bindEvents = function () {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.addEventListener('click', e => this.onClickKeyword(e));
    });

}

KeywordView.onClickKeyword = function (e) {
   const {keyword} = e.currentTarget.dataset;
   this.emit('@click', {keyword});
}

KeywordView.getKeywordHtml = function (data) {
    return data.reduce((html, item, index) => {
        html += this.getKeywordResultItemHtml(item, index+1);
        return html;
    }, '<ul class="list">') + '</ul>';
}

KeywordView.getKeywordResultItemHtml = function (item, no) {
    return `<li data-keyword="${item.keyword}">
        <span class="number">${no}</span>
        ${item.keyword}
    </li>`
}

export default KeywordView;
import KeywordView from './KeywordView.js'

const tag = '[HistoryView]';

const HistoryView = Object.create(KeywordView);

HistoryView.setup = function (el) {
    this.init(el)
    return this;
}

HistoryView.bindRemoveEvents = function () {
    Array.from(this.el.querySelectorAll('.btn-remove')).forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation(); // click 이벤트 전파를 막는다.
            this.onClickBtnRemove(btn.parentElement.dataset.keyword)
        });
    });
}

HistoryView.getKeywordResultItemHtml= function(item) {
    return `<li data-keyword="${item.keyword}">
        ${item.keyword}
        <span class="date">${item.date}</span>
        <button class="btn-remove"></button>
    </li>`;
};

HistoryView.onClickBtnRemove = function (keyword) {
   console.log(tag, 'onClickBtnRemove()', keyword);
   this.emit('@remove', {keyword});
};

export default HistoryView;
import KeywordView from './KeywordView.js'

const tag = '[HistoryView]';

const HistoryView = Object.create(KeywordView);

HistoryView.setup = function (el) {
    this.init(el)
    return this;
}

HistoryView.getKeywordResultItemHtml= function(item, no) {
    return `<li data-keyword="${item.keyword}">
        ${item.keyword}
        <span class="date">${item.date}</span>
        <button class="btn-remove"></button>
    </li>`
}


export default HistoryView;
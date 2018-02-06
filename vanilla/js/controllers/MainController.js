import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'
import HistoryView from '../views/HistoryView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'
import HistoryModel from "../models/HistoryModel.js";


const tag = '[MainController]';

export default {
    init() {
        console.log(tag, 'init()');
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onResetForm(e));

        TabView.setup(document.querySelector('#tabs'))
            .on('@change', e => this.onChangeTab(e.detail.tabName));

        ResultView.setup(document.querySelector('#search-result'));

        KeywordView.setup(document.querySelector('#search-keyword'))
            .on('@click', e => this.onClickKeyword(e.detail.keyword));

        HistoryView.setup(document.querySelector('#search-history'))
            .on('@click', e => this.onClickHistory(e.detail.keyword))
            .on('@remove', e => this.onRemoveHistory(e.detail.keyword));

        this.selectedTab = '추천 검색어';
        // this.selectedTab = '최근 검색어';
        this.renderView();
    },

    renderView() {
        console.log(tag, 'renderView()');
        TabView.setActiveTab(this.selectedTab);

        if (this.selectedTab === '추천 검색어') {
            this.fetchSearchKeyword();
            HistoryView.hide();
        } else {
            this.fetchSearchHistory();
            KeywordView.hide();
        }

        ResultView.hide();
    },

    search(query) {
        console.log(tag, 'search()', query);
        FormView.setValue(query);
        SearchModel.list(query).then(data => {
            this.onSearchResult(data);
        })
    },

    onSearchResult(data) {
        TabView.hide();
        KeywordView.hide();
        HistoryView.hide();
        ResultView.render(data);
    },

    onChangeTab(tabName) {
        console.log(tag, 'onChangeTab()', tabName);
        this.selectedTab = tabName;
        this.renderView();
    },

    fetchSearchKeyword() {
        KeywordModel.list().then(data => {
            KeywordView.render(data);
        })
    },

    onClickKeyword(keyword) {
        console.log(tag, 'onClickKeyword()', keyword);
        this.search(keyword);
    },

    fetchSearchHistory() {
        HistoryModel.list().then(data => {
            // 각 버튼에 대한 이벤트 바인딩을 위하여 체이닝
            HistoryView.render(data).bindRemoveEvents();
        })
    },

    onClickHistory(keyword) {
        console.log(tag, 'onClickHistory()', keyword);
        this.search(keyword);
    },

    onRemoveHistory(keyword) {
        console.log(tag, 'onRemoveHistory()', keyword);
        HistoryModel.remove(keyword);
        this.renderView();
    },

    onSubmit(input) {
        console.log(tag, 'onSubmit()', input);
        this.search(input);
    },

    onResetForm(e) {
        console.log(tag, 'onReset()');
        this.renderView();
    }
}

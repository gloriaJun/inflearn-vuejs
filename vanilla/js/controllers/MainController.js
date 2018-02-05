import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'

import SearchModel from '../models/SearchModel.js'


const tag = '[MainController]';

export default {
    init() {
        console.log(tag, 'init()');
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onResetForm(e));

        TabView.setup(document.querySelector('#tabs'))
            .on('@change', e => this.onChangeTab(e.detail.tabName));
        ResultView.setup(document.querySelector('#search-result'))

        // this.selectedTab = '추천 검색어';
        // this.renderView();
    },

    // renderView() {
    //   TabView.setActiveTab(this.selectedTab);
    // },

    search(query) {
        console.log(tag, 'search()', query);
        SearchModel.list(query).then(data => {
            this.onSearchResult(data);
        })
    },

    onSubmit(input) {
        console.log(tag, 'onSubmit()', input);
        this.search(input);
        ResultView.show();
    },

    onResetForm(e) {
        console.log(tag, 'onReset()');
        ResultView.hide();
    },

    onSearchResult(data) {
        ResultView.render(data);
    },

    onChangeTab(tabName) {
        console.log(tag, 'onChangeTab()');
    }
}

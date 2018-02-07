import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

new Vue({
    el: '#app',
    data: {
        query: '',
        isSubmit: false,
        tabs: ['추천 검색어', '최근 검색어'],
        selectedTab : '',
        searchResult: [],
        keywordList: [],
        historyList: []
    },
    created() {
        this.selectedTab = this.tabs[0]
        this.fetchKeyword();
        this.fetchHistory();
    },
    methods: {
        onSubmit() {
            this.search();
        },
        onClickResetBtn() {
            this.resetForm();
        },
        onKeyup() {
            if(!this.query.length) {
                this.onClickResetBtn();
            }
        },
        onClickTab(tab) {
            this.selectedTab = tab;
        },
        onClickKeyword(keyword) {
            this.query = keyword;
            this.search();
        },
        onClickHistoryRemoveBtn(keyword) {
            HistoryModel.remove(keyword);
            this.fetchHistory();
        },

        search() {
            SearchModel.list(this.query).then(data => {
                this.isSubmit = true;
                this.searchResult = data;
            });
            HistoryModel.add(this.query);
            this.fetchHistory();
        },
        fetchKeyword() {
            KeywordModel.list().then(data => {
                this.keywordList = data;
            });
        },
        fetchHistory() {
            HistoryModel.list().then(data => {
                this.historyList = data;
            });
        },
        resetForm() {
            this.query = '';
            this.isSubmit = false;
            this.searchResult = [];
        }
    }
})
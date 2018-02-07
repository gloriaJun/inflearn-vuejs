import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'

new Vue({
    el: '#app',
    data: {
        query: '',
        isSubmit: false,
        tabs: ['추천 검색어', '최근 검색어'],
        selectedTab : '',
        searchResult: [],
        keywordList: []
    },
    created() {
        this.selectedTab = this.tabs[0]
        this.fetchKeyword();
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
        
        search() {
            SearchModel.list(this.query).then(data => {
                this.isSubmit = true;
                this.searchResult = data;
            });
        },
        fetchKeyword() {
            KeywordModel.list().then(data => {
                this.keywordList = data;
            });
        },
        resetForm() {
            this.query = '';
            this.isSubmit = false;
            this.searchResult = [];
        }
    }
})
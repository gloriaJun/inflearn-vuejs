import SearchModel from './models/SearchModel.js'

new Vue({
    el: '#app',
    data: {
        query: '',
        isSubmit: false,
        tabs: ['추천 검색어', '최근 검색어'],
        selectedTab : '',
        searchResult: []
    },
    created() {
        this.selectedTab = this.tabs[0]
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
        search() {
            SearchModel.list(this.query).then(data => {
                this.isSubmit = true;
                this.searchResult = data;
            });
        },
        resetForm() {
            this.query = '';
            this.isSubmit = false;
            this.searchResult = [];
        }
    }
})
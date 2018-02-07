import SearchModel from './models/SearchModel.js'

new Vue({
    el: '#app',
    data: {
        query: '',
        isSubmit: false,
        searchResult: []
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
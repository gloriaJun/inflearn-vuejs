new Vue({
    el: '#app',
    data: {
        query: ''
    },
    methods: {
        onSubmit: function (e) {
            debugger
        },
        onClickResetBtn: function (e) {
            this.query = '';
            debugger
        },
        onKeyup: function (e) {
            if(!this.query.length) {
                this.onClickResetBtn();
            }
        }
    }
})
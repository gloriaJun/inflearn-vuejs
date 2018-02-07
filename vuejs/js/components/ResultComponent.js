export default {
    template: '#search-result',
    props: ['data', 'query'],
    data() {
        return {
            data: this.data
        }
    }
}
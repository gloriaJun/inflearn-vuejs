<template>
  <form v-on:submit.prevent="onSubmit">
    <input type="text" v-model="inputValue" v-on:keyup="onKeyup" placeholder="검색어를 입력하세요" autofocus>
    <button type="reset" v-on:click="onClickResetBtn" v-show="inputValue.length" class="btn-reset"></button>
  </form>
</template>

<script>
  export default {
    name: "form-component",
    props: ['value'],
    data() {
      return {
        inputValue: this.value
      }
    },
    watch: {
      value(newVal, oldVal) {
        this.inputValue = newVal;
      }
    },
    methods: {
      onSubmit() {
        this.$emit('@submit', this.inputValue.trim());
      },
      onClickResetBtn() {
        this.inputValue = '';
        this.$emit('@reset');
      },
      onKeyup() {
        if (!this.inputValue.length) {
          this.onClickResetBtn();
        }
      },
    }
  }
</script>

<style scoped>

</style>

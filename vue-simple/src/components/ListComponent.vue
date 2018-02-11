<template>
  <div v-if="data.length">
    <ul class="list">
      <li v-for="(item, index) in data" v-on:click="onClickList(item.keyword)">
        <span class="number" v-if="keywordType">{{index + 1}}</span>
        {{item.keyword}}
        <span class="date" v-if="historyType">{{item.date}}</span>
        <button class="btn-remove" v-if="historyType"
                v-on:click.stop="onRemoveListBtn(item.keyword)"></button>
      </li>
    </ul>
  </div>
  <div v-else>
    검색어가 없습니다.
  </div>
</template>

<script>
  export default {
    name: "list-component",
    props: ['data', 'type'],
    computed: {
      keywordType() {
        return this.type === 'keyword'
      },
      historyType() {
        return this.type === 'history'
      }
    },
    methods: {
      onClickList(keyword) {
        this.$emit('@click', keyword);
      },
      onRemoveListBtn(keyword) {
        this.$emit('@remove', keyword);
      }
    }
  }
</script>

<style scoped>

</style>

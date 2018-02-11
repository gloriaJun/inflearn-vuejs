<template>
  <div id="app">
    <header>
      <h2 class="container">검색</h2>
    </header>
    <div class="container">
      <search-form v-bind:value="query"
                   v-on:@submit="onSubmit" v-on:@reset="onClickResetBtn"></search-form>
      <div v-if="isSubmit">
        <search-result v-bind:data="searchResult" v-bind:query="query"></search-result>
      </div>
      <div v-else>
        <tabs v-bind:tabs="tabs" v-bind:selected-tab="selectedTab"
              v-on:@change="onClickTab"></tabs>
        <div v-if="selectedTab === tabs[0]">
          <list v-bind:data="keywordList" type="keyword"
                v-on:@click="onClickKeyword"></list>
        </div>
        <div v-else>
          <list v-bind:data="historyList" type="history"
                v-on:@click="onClickKeyword"
                v-on:@remove="onClickHistoryRemoveBtn"></list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormComponent from './components/FormComponent'
import ResultComponent from './components/ResultComponent'
import ListComponent from './components/ListComponent'
import TabComponent from './components/TabComponent'

import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

export default {
  name: 'app',
  data () {
    return {
      query: '',
      isSubmit: false,
      tabs: ['추천 검색어', '최근 검색어'],
      selectedTab : '',
      searchResult: [],
      keywordList: [],
      historyList: []
    }
  },
  components: {
    'search-form': FormComponent,
    'search-result': ResultComponent,
    'list': ListComponent,
    'tabs': TabComponent
  },
  created() {
    this.selectedTab = this.tabs[0]
    this.fetchKeyword();
    this.fetchHistory();
  },
  methods: {
    onSubmit(query) {
      this.query = query;
      this.search();
    },
    onClickResetBtn() {
      this.resetForm();
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
}
</script>

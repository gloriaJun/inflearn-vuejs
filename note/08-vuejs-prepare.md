# VueJS

## VueJS Installation
[해당 git branch](https://github.com/jeonghwan-kim/lecture-vue/tree/2-vue/scafolding/2-vue)

최초의 스캐폴딩은 vanilla에서 진행한 것과 유사함    
vuejs 라이브러리 로딩은 vuejs cdn을 이용하여 강의 진행함.

## Vanilla로 구현한 화면을 VueJS를 이용하여 구현하기

#### 입력폼 구현
- 검색어를 입력하면 x버튼이 보인다   
`v-model`을 이용하여 데이타를 연결하고,    
`v-show`를 이용하여 model에 연결한 데이타의 길이에 따라 제어한다.
    - v-model : 양방향 바인딩을 지원하는 디렉티브
    

- 엔터를 입력하면 검색 결과가 보인다   
`methods`에 DOM과 바인딩할 메소드를 정의한다.   
`v-on:submit.prevent`와 같이 디렉티브를 정의하면 submit 이벤트 발생 후에 화면이 갱신되는 현상을 막을 수 있다.


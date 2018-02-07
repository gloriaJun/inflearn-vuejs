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

#### 검색결과 구현
- 검색 결과가 검색폼 아래 위치한다    
조건에 대한 처리는 `v-if` 디렉티브를 사용   
```javascript
<div v-if="searchResult.length">
</div>
<div v-else>
    {{query}} 검색어로 찾을 수 없습니다.
</div>
```

- 검색 결과가 보인다   
array로 이루어진 리스트는 `v-for` 디렉티브를 이용한다
```javascript
<ul>
    <li v-for="item in searchResult">
       <img v-bind:src="item.image">{{item.name}}
    </li>
</ul>
```

- x버튼을 클릭하면 검색폼이 초기화 되고, 검색 결과가 사라진다
reset 버튼 클릭 시에 발생하는 이벤트를 정의한 함수에서    
`data` 에 선언한 변수의 값에 대해 초기 값으로 재선언해준다.

#### 탭 구현
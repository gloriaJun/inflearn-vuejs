## Vue Component
Component는 화면 구조 별로 나눈다. 각각의 작은 모듈들로 쪼갠다.
트리로 표현하면 최상위 노드가 전체 페이지. 하위 노드가 그 바로 아래 엘리먼트들로 이루어진다.   
이 각각의 노드를 Component라고 생각하면 된다.

하나의 Component는 크게 보면 아래와 같이 3가지로 이루어져있다. 
- HTML : 템플릿
- JS : Component의 로직이 들어가는 부분   
- CSS : 화면의 색상이나 수치들을 정의 

VueJS에서는 해당 Component에 대한 파일의 확장자를 `Vue`로 정의하고 있다.

> Chrome에서 VueJS 디버깅을 위한 별도의 확장 플러그인을 제공한다.    
> 해당 툴을 이용하면 각각의 Component 들에 대한 상태를 확인할 수 있다.   


#### 앞에서 작성한 코드를 기반으로 Component 구현
!! 현재 강의에 사용된 화면 기준으로 설명된 내용임. 
- 검색어의 경우, 다른 컴포넌트의 동작에도 영향을 미치므로 상위 컴포넌트에서 관리하는 것이 좋다.   
    - 즉, app.js에서 관리하는 것이 좋음
    - props라는 key를 이용하여 부모로부터 값을 전달받을 수 있다.
    - `$emit()`을 이용하여 자식이 부모에게 전달할 수 있다.
```html
<search-form v-bind:value="query" v-on:@submit="onSubmit"></search-form>
```
```javascript
// 부모 컴포넌트
onSubmit(query) {
  this.query = query;
  this.search();
},

// 자식 컴포넌트 - 이벤트와 파라미터를 전달한다.
onSubmit() {
    this.$emit('@submit', this.inputValue.trim());
},
```

###### computed
템플릿에서 변수 처럼 사용할 수 있는 기능
```html
<span class="number" v-if="keywordType">{{index + 1}}</span>
```
```javascript
computed: {
    keywordType() {
        return this.type === 'keyword'
    },
    historyType() {
        return this.type === 'history'
    }
},
```

###### watch
어떠한 값을 감시하다가 값이 변경이 되면 동작을 하도록 정의
```javascript
watch: {
    value(newVal, oldVal) {
        this.inputValue = newVal;
    }
},
```


#### 단일 파일 Component
`.vue` 파일안에 template이 정의된 html과 javascript가 정의된 내용을 작성하여 관리할 수 있도록 지원해준다.

- vue-cli를 설치한다.
- `vue list`를 실행하면 vue에서 지원하는 템플릿을 확인할 수 있다.


## 검색폼 구현 by VanillaJS

#### 요구사항 - 검색폼 구현 
[ ] 검색 상품명 입력 폼이 위치한다. 검색어가 없는 경우이므로 x 버튼을 숨긴다
[ ] 검색어를 입력하면 x버튼이 보인다
[ ] 엔터를 입력하면 검색 결과가 보인다
[ ] x 버튼을 클릭하거나, 검색어를 삭제하면 검색 결과를 삭제한다  


###### 검색 상품명 입력 폼이 위치한다. 검색어가 없는 경우이므로 x 버튼을 숨긴다
1. 화면 구현
폼을 구현할 것이므로 `index.html`에서 먼저 화면을 구현한다.

2. views/FormView.js
검색 폼 동작에 대한 자바스크립트 구현 부분
`views/View.js`를 상속받아서 구현한다.

3. controller/MainController.js
controller에 FormView를 import한 뒤에 호출한다.


###### 검색어를 입력하면 x버튼이 보인다
`views/FormView.js`에서 `keyup` 이벤트를 이용하여 입력에 대한 바인딩을 처리한다.
```javascript
this.inputEl.addEventListener('keyup', e => this.onkeyup(e));
```


###### 엔터를 입력하면 검색 결과가 보인다
FormVeiw는 검색 결과에 대해 출력을 하지 않아도 된다.
단지, MainController에게 알려주면 된다.
그러면 MainController는 전달받은 결과를 ResultView에게 전해준다.

이렇게 MainController에 전달할 때 사용되는 함수가 `emit` 이다.
```javascript
// 전달받는 쪽에서는 on 메서드를 이용하여 해당 이벤트를 정의
FormView.setup(document.querySelector('form'))
    .on('@submit', e => this.onSubmit(e.detail.input));
    
onSubmit(input) {
    console.log(tag, 'onSubmit', input);
}    
    
// 전달하는 쪽에서는 해당 이벤트를 전달
this.emit('@submit', this.inputEl.value);
```

그리고 submit 이벤트 발생 시에는 keyup 이벤트에서 무시하도록 아래와 같이 처리해준다.
```javascript
FormView.bindEvents = function () {
    this.on('submit', e => e.preventDefault());
    this.inputEl.addEventListener('keyup', e => this.onKeyup(e));
}
```

또한 위와 같이 체이닝으로 구현한 경우에는 `FormView`에서 this를 리턴해주어야한다.


###### x 버튼을 클릭하거나, 검색어를 삭제하면 검색 결과를 삭제한다  
`@reset` 이벤트를 이용하여 이벤트를 구현한다.
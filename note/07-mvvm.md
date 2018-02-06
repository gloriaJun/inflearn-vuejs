## MVVM

MVVM은 MVC와 다르게 뒷 부분이 View Model로 되어있다.   
구조상으로는 View와 모델 사이에 위치하고 있다.   
Model로부터 데이타를 가져오는 데 View에 적합한 형태의 데이타로 가공이 된다.   
(양방향 바인딩을 의미하나??)    
하나의 모델에는 하나의 뷰 모델이 매칭된다.    
모델이 변경이 되면 뷰에도 같이 반영이 된다.

해당 부분에 대한 간단한 예제 
```html
<h1></h1>
```

```javascript
const h1 = document.querySelector('h1');
const viewModel = {};
let model = '';

Object.defineProperty(viewModel, 'model', {
   get() { return model;},
   set(val) {
       model = val;
       h1.innerHTML = model;
   } 
});
```

위와 같이 정의한 상태에서 콘솔창에서 다음과 같이 모델의 값을 변경하면 화면에 반영이 되는 것을 확인할 수 있다.
```javascript
viewModel.model = 'red';
viewModel.model = 'blue';
```
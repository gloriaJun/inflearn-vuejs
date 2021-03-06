## 최근 검색어 구현 by VanillaJS
추천 검색어 탭 클릭 시에 하단에 나오는 검색어 목록

#### 요구사항
[ ] 최근 검색어, 목록이 탭 아래 위치한다   
[ ] 목록에서 검색어를 클릭하면 선택된 검색어로 검색 결과 화면으로 이동   
[ ] 검색일자, 버튼 목록이 있다    
[ ] 목록에서 x 버튼을 클릭하면 선택된 검색어가 삭제된다.   
[ ] 검색시마다 최근 검색어 목록에 추가된다   

###### 최근 검색어, 목록이 탭 아래 위치한다   
###### 목록에서 검색어를 클릭하면 선택된 검색어로 검색 결과 화면으로 이동 
앞에서 작성한 `KeywordView`를 복사하여 재사용한다.

###### 검색일자, 버튼 목록이 있다    
`KeywordView`의 *getKeywordResultItemHtml* 함수를 `HistoryView`에서 재정의 한다.

###### 목록에서 x 버튼을 클릭하면 선택된 검색어가 삭제된다.
버튼에서 부모 엘리먼트를 가져오기. 클릭 이벤트 전파 막기
```javascript
Array.from(this.el.querySelectorAll('.btn-remove')).forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation(); // click 이벤트 전파를 막는다.
        this.onClickBtnRemove(btn.parentElement.dataset.keyword)
    });
});
```

동적으로 생성되는 버튼에 대해 바인딩 처리를 위해 `MainController`에서 아래와 같이 바인딩 함수를 체이닝한다.   
그리고 체이닝을 위해 render 함수에서 this를 리턴해주어야함.
```javascript
HistoryModel.list().then(data => {
    // 각 버튼에 대한 이벤트 바인딩을 위하여 체이닝
    HistoryView.render(data).bindRemoveEvents();
})
```

모델에서 데이타 삭제는 HistoryModel에 사전에 정의된 remove 함수를 호출한다.


###### 검색시마다 최근 검색어 목록에 추가된다   
`MainController`의 search 함수에서 HistoryModel에 검색어를 추가해준다.
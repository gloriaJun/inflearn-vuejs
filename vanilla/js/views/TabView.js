import View from './View.js'

const tag = '[TabView]';

const TabView = Object.create(View);

TabView.tabNames = {
    recommand : '추천 검색어',
    recent: '최근 검색어',
}

TabView.setup = function (el) {
    this.init(el);
    this.bindEvents();
    return this;
}

TabView.setActiveTab = function (tabName) {
   Array.from(this.el.children).forEach(li => {
       li.className = li.innerHTML === tabName ? 'active' : '';
   });
   this.show();
}

// 이벤트 바인딩을 처리하는 함수
TabView.bindEvents = function () {
    // 이벤트를 등록할 selector에 대해 루프를 돌면서 등록한다
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.addEventListener('click', e => this.onClickTab(li.innerHTML));
    });

}

TabView.onClickTab = function (tabName) {
    this.setActiveTab(tabName);
    // 탭 하단의 내용에 대해서는 관심사가 다르므로 컨트롤러에게 알려줘야한다.
    this.emit('@change', {tabName});
}


export default TabView;
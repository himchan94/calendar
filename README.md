# Schedule Calendar Project

👇 👇 👇 Link 👇 👇 👇

https://myfirstcalendar-9b942.web.app/

-----

### 프로젝트 기획이유
> 평소 google calendar를 이용하고 있는데, google calendar에서는 완료된 일정들이 달력에 그대로 표시되는 부분이 신경쓰였다. 그래서 지금까지 배웠던 React.js를 사용해서 완료된 일정과 미완료 일정을 구분해서 볼 수 있는 달력을 구현해보고 싶어 프로젝트를 기획하게 되었다.
> calendar 관련 다양한 패키지들이 존재해서, 달력 뷰를 간단한게 만들 수 있었지만, 달력에 필요한 알고리즘을 만들며 달력이 어떤 식으로 동작하는지 보고 싶어 직접 달력 뷰를 구현했다. 

### 사용 기술
React.js, Firebase(firestore), React-redux, styled-components

### Overview

![그림1](https://user-images.githubusercontent.com/71649055/124678854-555ab700-defe-11eb-977a-526f846ce7ab.png)


### 1. 월 변경
오늘의 날짜(today)는 Redux 내에서 관리된다. 이전/이후 버튼을 클릭하면 현재 월에서 달의 추가 및 감소가 가능하고(moment.js의 add  subtract 함수를 이용) 월 변경이 가능해진다.

### 2. 일정 작성하기
버튼 클릭 시, 일정을 작성하는 Modal 창이 나타난다. 
![그림2](https://user-images.githubusercontent.com/71649055/124687765-847a2400-df10-11eb-8cce-12795fa9c481.png)

모달창에서 내용과 날짜를 입력 후 작성완료를 클릭하면 Firestore로 해당 데이터가 저장되며, updateTodoFB 내의 loadTodo 액션을 통해 새로 추가된 데이터가 initialState로 들어가며 웹페이지에 표시된다.

todo.js 참고

### 3. 완료된 일정 보기
```
              let update_data = {};

              if (selected_todo.completed) {
                update_data = { ...selected_todo, completed: false };
              } else {
                update_data = { ...selected_todo, completed: true };  // 완료버튼 클릭 시 completed가 true로 바뀐다.
              }

              dispatch(
                updateTodoFB(
                  moment(selected_todo.datetime).format("YYYY-MM-DD"),
                  selected_todo.todo_id,
                  update_data
                )
              );
              _setIsOpen(false); 
```
완료 상태의 true & false를 통해 완료된 일정 보기 버튼 클릭시 데이터를 필터링해서 볼 수 있다. (* 완료상태의 데이터는 노란색으로 출력됨)


### bug
1. 일정 작성 모달창에서 취소하기 버튼을 누르면 달력뷰 페이지로 이동하지 않는다.
2. 첫 일정 작성시 일정이 2번씩으로 중복되서 출력되는 현상이 있다.

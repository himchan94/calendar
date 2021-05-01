import React from "react";
import moment from "moment";
import styled from "styled-components";

import Calendar from "../components/Calendar";
import Popup from "./Popup";

const _todo_list = {
  "2021-04-17": [
    {
      todo_id: 11,
      datetime: "2021-04-17 10:10:00",
      contents: "산책가기1",
      completed: false,
    },
    {
      todo_id: 155555,
      datetime: "2021-04-17 10:15:00",
      contents: "산책가기2",
      completed: false,
    },
  ],
  "2021-04-21": [
    {
      todo_id: 8,
      datetime: "2021-04-21 10:00:00",
      contents: "산책가기3",
      completed: false,
    },
    {
      todo_id: 4,
      datetime: "2021-04-21 10:10:00",
      contents: "산책가기4",
      completed: false,
    },
  ],
};

const Main = (props) => {
  const [today, setToday] = React.useState(moment());
  const [todo_list, setTodoList] = React.useState(_todo_list);
  // is_open 사용해서 팝업을 보였다가 안보이게 해줄거예요 :)
  const [is_open, setIsOpen] = React.useState(false);
  // 이 값에 선택한 일정 정보를 넣어줄거예요.
  // 없을 때는 null로!
  // 앗, 여기서 잠깐! 팝업을 닫을 때 이 값을 어떻게 해줘야할까요?
  // -> 그렇습니다 :) null로 다시 바꿔줘야죠!
  const [selected_todo, setSeletedTodo] = React.useState(null);

  //   완료된 일정만 보기 토글이에요!
  //   이 값은 캘린더에도 전달해줄거예요.
  //   그럼 캘린더가 이 값을 보고 완료된 일정만 보여주자! 앗 아니야, 전체를 보여주자! 결정할 수 있겠죠? :)
  const [show_completed, setShowCompleted] = React.useState(false);

  //   console.log(today);

  const deleteTodo = (date, todo_id) => {
    const _new_todo_list = { ...todo_list };

    let todos = _new_todo_list[date];

    todos = todos.filter((t) => {
      return t.todo_id !== todo_id;
    });

    const new_todo_list = { ..._new_todo_list, [date]: todos };
    setTodoList(new_todo_list);
  };

  const updateTodo = (date, todo_id, todo_data = {}) => {
    const _new_todo_list = { ...todo_list };

    let todos = _new_todo_list[date];

    let new_todo_list = {};

    if (date === moment(todo_data.datetime).format("YYYY-MM-DD")) {
      todos = todos.map((t) => {
        if (t.todo_id === todo_id) {
          return { ...t, ...todo_data };
        } else {
          return t;
        }
      });

      new_todo_list = { ..._new_todo_list, [date]: todos };
    } else {
      const _new_date = moment(todo_data.datetime).format("YYYY-MM-DD");
      const _new_date_todos = _new_todo_list[_new_date]
        ? _new_todo_list[_new_date]
        : [];
      new_todo_list = {
        ..._new_todo_list,
        [date]: _new_todo_list[date].filter((t) => t.todo_id !== todo_id),
        [_new_date]: [..._new_date_todos, { ...todo_data }],
      };
    }

    setTodoList(new_todo_list);
  };

  return (
    <Container>
      <Calendar
        todo_list={todo_list}
        today={today}
        _changeMonth={setToday}
        _setSeletedTodo={setSeletedTodo}
        selected_todo={selected_todo}
        _setIsOpen={setIsOpen}
        show_completed={show_completed}
      />
      {is_open && (
        <Popup
          _setIsOpen={setIsOpen}
          selected_todo={selected_todo}
          _updateTodo={updateTodo}
          _deleteTodo={deleteTodo}
        />
      )}
      <Button
        onClick={() => {
          // props.history.push("/write");
          const new_todo_date = "2021-05-01";
          const new_todo_data = {
            todo_id: new Date().getTime(), // 임시 아이디!
            datetime: "2021-05-01 10:10:00",
            contents: "산책가기5",
            completed: false,
          };

          let new_todo_list = {};

          if (Object.keys(todo_list).indexOf(new_todo_date) !== -1) {
            new_todo_list = {
              ...todo_list,
              [new_todo_date]: [...todo_list[new_todo_date], new_todo_data],
            };
          } else {
            new_todo_list = { ...todo_list, [new_todo_date]: [new_todo_data] };
          }

          console.log(new_todo_list);
          setTodoList(new_todo_list);
        }}
      >
        일정 작성하기
      </Button>
      <Button
        onClick={() => {
          setShowCompleted(!show_completed);
        }}
      >
        {show_completed ? "전체 일정 보기" : "완료된 일정만 보기"}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: lightblue;
  margin: auto;
`;

const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  height: 5vh;
`;
export default Main;

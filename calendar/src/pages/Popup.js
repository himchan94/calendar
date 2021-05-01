import React from "react";
import styled from "styled-components";

import moment from "moment";

// const _todo_list = {
//   "2021-04-17": [
//     {
//       todo_id: 11,
//       datetime: "2021-04-17 10:10:00",
//       contents: "산책가기1",
//       completed: false,
//     },
//     {
//       todo_id: 155555,
//       datetime: "2021-04-17 10:15:00",
//       contents: "산책가기2",
//       completed: false,
//     },
//   ],

const Popup = (props) => {
  const { _setIsOpen, selected_todo, _updateTodo, _deleteTodo } = props;
  const contents = React.useRef(null);
  const datetime = React.useRef(null);
  return (
    <Container
      onClick={(props) => {
        _setIsOpen(false);
      }}
    >
      <Grid
        onClick={(e) => {
          // 이벤트 전파를 막아줘요! 2주차 과제 하실 때 본 칭구들! :)
          e.stopPropagation();
        }}
      >
        일정내용
        <input ref={contents} placeholder={selected_todo.contents} />
        일시
        <input
          type="datetime-local"
          ref={datetime}
          placeholder={selected_todo.datetime}
        />
        <Grid2>
          <button
            onClick={() => {
              _deleteTodo(
                moment(selected_todo.datetime).format("YYYY-MM-DD"),
                selected_todo.todo_id
              );
              _setIsOpen(false);
            }}
          >
            삭제하기
          </button>
          <button
            onClick={() => {
              let update_data = {};

              let _contents =
                contents.current.value === ""
                  ? selected_todo.contents
                  : contents.current.value;

              let _datetime =
                datetime.current.value === ""
                  ? selected_todo.datetime
                  : datetime.current.value;

              update_data = {
                ...selected_todo,
                contents: _contents,
                datetime: _datetime,
              };

              _updateTodo(
                moment(selected_todo.datetime).format("YYYY-MM-DD"),
                selected_todo.todo_id,
                update_data
              );
              _setIsOpen(false);
            }}
          >
            수정하기
          </button>
          <button
            onClick={() => {
              let update_data = {};

              if (selected_todo.completed) {
                update_data = { ...selected_todo, completed: false };
              } else {
                update_data = { ...selected_todo, completed: true };
              }

              _updateTodo(
                moment(selected_todo.datetime).format("YYYY-MM-DD"),
                selected_todo.todo_id,
                update_data
              );
              _setIsOpen(false);
            }}
          >
            완료하기
          </button>
        </Grid2>
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  position: fixed;
`;

const Grid = styled.div`
  width: 50vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  background-color: yellow;
  justify-content: center;
  text-align: center;
`;

const Grid2 = styled.div`
  margin-top: 20px;
`;
export default Popup;

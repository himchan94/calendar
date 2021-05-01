import React from "react";
import styled from "styled-components";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import { addTodoFB } from "../redux/modules/todo";

const Write = (props) => {
  const contents = React.useRef(null);
  const datetime = React.useRef(null);
  const dispatch = useDispatch();
  const writeTodo = () => {
    let _new_todo = {
      datetime: moment(datetime.current.value).format("YYYY-MM-DD hh:mm:ss"),
      contents: contents.current.value,
      completed: false,
    };

    dispatch(addTodoFB(_new_todo.datetime, _new_todo));

    props.history.replace("/");
  };

  return (
    <Container>
      <Grid>
        일정내용
        <input ref={contents} />
        일시
        <input type="datetime-local" ref={datetime} />
        <Grid2>
          <button>작성취소하기</button>
          <button onClick={writeTodo}>작성완료하기</button>
        </Grid2>
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  font-size: 30px;
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

export default Write;

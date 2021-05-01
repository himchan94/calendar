import React from "react";
import moment from "moment";
import styled from "styled-components";

import Calendar from "../components/Calendar";
import Popup from "./Popup";

import { useSelector, useDispatch } from "react-redux";
import { getTodoFB } from "../redux/modules/todo";

const Main = (props) => {
  const dispatch = useDispatch();
  const [is_open, setIsOpen] = React.useState(false);
  const [selected_todo, setSeletedTodo] = React.useState(null);
  const [show_completed, setShowCompleted] = React.useState(false);

  React.useEffect(() => {
    dispatch(getTodoFB());
    console.log("값을 받아온다");
  }, []);

  return (
    <Container>
      <Calendar
        _setSeletedTodo={setSeletedTodo}
        selected_todo={selected_todo}
        _setIsOpen={setIsOpen}
        show_completed={show_completed}
      />
      {is_open && (
        <Popup _setIsOpen={setIsOpen} selected_todo={selected_todo} />
      )}
      <Button
        onClick={() => {
          props.history.push("/write");
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

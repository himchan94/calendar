import React from "react";
import moment from "moment";
import styled from "styled-components";

import Calendar from "../components/Calendar";

const Main = () => {
  const [today, setToday] = React.useState(moment());

  const todo_list = {
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
  //   console.log(today);

  return (
    <Container>
      <Calendar todo_list={todo_list} today={today} _changeMonth={setToday} />
      <div>완료된일정보는 버튼, 일정추가하는 버튼</div>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  margin: auto;
`;
export default Main;

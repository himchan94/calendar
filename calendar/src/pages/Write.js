import React from "react";
import styled from "styled-components";
import moment from "moment";

//  const todo_list = {
//    "2021-04-17": [
//      {
//        todo_id: 11,
//        datetime: "2021-04-17 10:10:00",
//        contents: "산책가기1",
//        completed: false,
//      },
//    ],
//  };
//데이터 양식에 맞춰서 값 입력해보기

const Write = (props) => {
  const contents = React.useRef(null);
  const datetime = React.useRef(null);

  const writeTodo = () => {
    // 콘솔로 내가 선택한 데이터가 잘 왔나 확인해볼까요? :)
    // console.log(contents.current.value);
    // console.log(datetime.current.value);

    let _new_todo = {
      todo_id: "dummy_id1111", // 아이디는 나중에 디비에 저장되면, 그때 가져와야죠! 일단 가짜로 둡니다!
      datetime: moment(datetime.current.value).format("YYYY-MM-DD hh:mm:ss"), // 우리 데이터 형식대로 맞춰줍니다.
      contents: contents.current.value,
      completed: false, // 지금 만들었으니 당연히 false겠죠!
    };

    console.log(_new_todo);

    // 추가로 하나만 더! 일정을 추가했으면 원래 페이지로 돌아가야죠! replace 사용해봅시다!
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

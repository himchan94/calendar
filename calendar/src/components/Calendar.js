import React from "react";
import moment from "moment";

import styled from "styled-components";

const Calendar = (props) => {
  const {
    today,
    _changeMonth,
    todo_list,
    _setSeletedTodo,
    selected_todo,
    _setIsOpen,
  } = props;
  // console.log(moment(today));
  // 이번달의 시작 주, 끝 주를 구합니다.
  const start_week = moment(today).startOf("month").week();
  const end_week = moment(today).endOf("month").week();
  //   console.log(start_week); //14
  //   console.log(end_week); //18
  const week_num =
    (start_week > end_week ? 53 - start_week : end_week - start_week) + 1;

  const _week_arr = Array.from({ length: week_num }, (v, i) => start_week + i); // 4월달 [14, 15, 16, 17, 18]

  const week_arr = _week_arr.map((week_index) => {
    return (
      <Grid key={`${moment(today).format("MM")}_week_${week_index}`}>
        {Array.from({ length: 7 }, (v, i) => i).map((day_index) => {
          let _day = today
            .clone()
            .startOf("year")
            .week(week_index)
            .startOf("week")
            .add(day_index, "day");

          const is_today =
            moment().format("YYYY-MM-DD") === _day.format("YYYY-MM-DD");

          const list_index = Object.keys(todo_list).indexOf(
            _day.format("YYYY-MM-DD")
          );

          const _list =
            list_index !== -1 ? todo_list[_day.format("YYYY-MM-DD")] : [];

          const list = _list.map((_l, idx) => {
            // 데이터 확인하기!
            //console.log("l의 모양은", _l);
            // 일정을 뿌려줘요!
            //false and   완료일때 true -> false,  미완료일때 false -> true
            //일때 전체일정, true일때 완료된 일정만
            // true   ->

            if (props.show_completed && !_l.completed) {
              return null;
            }
            return (
              <Schedule
                key={`${_l.datetime}_${_l.todo_id}`}
                onClick={() => {
                  _setSeletedTodo(_l);
                  console.log("렌더링된당");
                  _setIsOpen(true);
                }}
                bg={_l.completed ? "yellow" : "#ffffff"}
              >
                {_l.contents}
              </Schedule>
            );
          });

          return (
            <Grid2
              key={`${moment(today).format(
                "MM"
              )}_week_${week_index}_day_${day_index}`}
              bg={is_today ? "#ffcece" : "#ffffff"}
            >
              {_day.format("D")}
              {list}
            </Grid2>
          );
          //console.log(_day.format("MM-DD"));
        })}
      </Grid>
    );
  });

  const dow = ["일", "월", "화", "수", "목", "금", "토"].map((_d) => {
    return (
      <Grid3>
        <span key={`${moment(today).format("MM")}_week_${_d}`}>{_d}</span>
      </Grid3>
    );
  });

  return (
    <React.Fragment>
      <Grid4>
        <button
          onClick={() => {
            // 자식 컴포넌트에서 부모 컴포넌트의 state를 조절하는 건 좋은 방법은 아닙니다.
            // 하지만 아직 뷰만들기 단계니까 맘껏 조절해볼게요 :)
            // 이런걸 양방향 바인딩이라고 불러요 (소근 /// 양방향 바인딩.. 찾아보실거죠? 믿씁니다!)
            _changeMonth(moment(today).clone().subtract(1, "month"));
          }}
        >
          이전
        </button>
        {moment(today).format("YY년 MM월")}
        <button
          onClick={() => {
            _changeMonth(moment(today).clone().add(1, "month"));
          }}
        >
          이후
        </button>
      </Grid4>
      <Grid>{dow}</Grid>
      {week_arr}
    </React.Fragment>
  );
};

const Grid = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Grid2 = styled.div`
  display: flex;
  width: 15vw;
  min-height: 10vh;
  height: auto;
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  fontsize: 10px;
  flex-direction: column;
  text-align: center;
  border: 4px dashed #bcbcbc;
`;
const Grid3 = styled.div`
  display: flex;
  width: 15vw;
  height: auto;
  background-color: #ffffff;
  fontsize: 10px;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border: 4px solid black;
`;

const Grid4 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  font-size: 30px;
`;

const Schedule = styled.div`
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
`;

export default Calendar;

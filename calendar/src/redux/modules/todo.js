import moment from "moment";
import { firestore } from "../../shared/firebase";

// 파이어스토어 연결
const todoDB = firestore.collection("todo");

// 액션 타입 생성
const LOAD = "todo/LOAD";
const ADD = "todo/ADD";
const UPDATE = "todo/UPDATE";
const DELETE = "todo/DELETE";
const CHANGE_TODAY = "todo/CHANGE_TODAY";

// 액션 생성자 생성
export const loadTodo = (todo_list) => {
  return { type: LOAD, todo_list };
};

export const addTodo = (date, todo_data) => {
  return { type: ADD, date, todo_data };
};

export const updateTodo = (date, todo_id, todo_data) => {
  return { type: UPDATE, date, todo_id, todo_data };
};

export const deleteTodo = (date, todo_id) => {
  return { type: DELETE, date, todo_id };
};

export const changeToday = (date) => {
  return { type: CHANGE_TODAY, date };
};

// 초기 값
const initialState = {
  today: moment(),
  todo_list: {},
};

// 미들웨어 + 파이어 스토어 연동해서 파이어 스토어의 데이터를 가져오는 함수
export const getTodoFB = () => {
  return function (dispatch) {

    todoDB
      .get()
      .then((docs) => {
        let _todo_list_fb = [];
        docs.forEach((doc) => {
          // 데이터를 배열에 넣어요!
          console.log(doc.data(), "doc data");
          _todo_list_fb.push({ ...doc.data(), todo_id: doc.id });
        });

        // 파이어스토어에서 받아온 데이터 형식을 intialState의 형식에 맞게 맞춰춘다.
        const todo_list = _todo_list_fb.reduce((acc, cur) => {
          // 현재 값의 날짜 년-월-일
          let _date = moment(cur.datetime).format("YYYY-MM-DD");
          // 만약 누산된 딕셔너리에 현재 값의 datetime과 같은 날짜의 키가 있다면?
          if (Object.keys(acc).indexOf(_date) !== -1) {
            return { ...acc, [_date]: [...acc[_date], cur] };
          } else {
            return { ...acc, [_date]: [cur] };
          }
        }, {});

        console.log(todo_list);

        // 액션발생
        dispatch(loadTodo(todo_list));
      })
      .catch((err) => {
      // 에러 발생 시 에러 메세지
        console.log(err);
      });
  };
};

// 파이어스토어에 데이터 추가하는 함수
export const addTodoFB = (date, todo_data) => {
  return function (dispatch) {
    todoDB
      .add({ ...todo_data })
      .then((doc) => {

        console.log(date, { ...todo_data, todo_id: doc.id });
        dispatch(addTodo(date, { ...todo_data, todo_id: doc.id }));
      })
      .catch((err) => {
        // 에러메시지
        console.log(err);
      });
  };
};

// 파이어스토어 데이터 수정하기
export const updateTodoFB = (date, todo_id, todo_data) => {
  return function (dispatch) {
    let _todo_data = todo_data;
    delete _todo_data.todo_id;

    // Firestore에 동일 id를 찾아 데이터를 수정한다.
    todoDB
      .doc(todo_id)
      .update({ ..._todo_data })
      .then((doc) => {
        //   성공했다면 리덕스도 업데이트
        dispatch(updateTodo(date, todo_id, todo_data));
      })
      .catch((err) => {
        // 에러메시지 출력
        console.log(err);
      });
  };
};

// 파이어스토어 데이터 삭제하기
export const deleteTodoFB = (date, todo_id) => {
  return function (dispatch) {
    // 해당 아이디를 찾아 파이어스토어에서 데이터를 삭제한다.
    todoDB
      .doc(todo_id)
      .delete()
      .then((res) => {
        // 성공했다면 리덕스도 데이터 삭제
        dispatch(deleteTodo(date, todo_id));
      })
      .catch((err) => {
        // 에러메시지를 콘솔에 띄워봅시다 :)
        console.log(err);
      });
  };
};

// 4. 생성
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    // 액션으로 받아오는 것 : todo_list
    // todo_list : 일정 딕셔너리
    case "todo/LOAD":
      return { ...state, todo_list: { ...action.todo_list } };

    case "todo/ADD": {
      // 액션으로 받아오는 것 : date, todo_data
      const todo_list = { ...state.todo_list };
      // 데이터 넣는 부분!
      // 1. 생성
      const new_todo_date = moment(action.date).format("YYYY-MM-DD");
      const new_todo_data = {
        ...action.todo_data,
        todo_id: new Date().getTime(), // 임시 아이디
      }; // 새 일정 데이터

      // 2. 원본 데이터랑 합친다!
      let new_todo_list = {}; // 원본 데이터 + 추가할 일정

      // Object.keys(todo_list) : todo_list에서 키값만 가져다 배열을 만드는 내장함수 mdn 참고
      // Object.keys(todo_list).indexOf(new_todo_data) 근데, todo_list 키값 배열에 가짜 데이터 넣을 날짜로 된 키가 있는지 확인.
      //   ㄴ있으면 어디있나 인덱스가 나오고, 없으면? -1이 나옵니다.
      // Object.keys(todo_list).indexOf(new_todo_data) !== -1 : todo_list 키값 배열에 가짜 데이터 넣을 날짜 키가 있으면 true, 없으면 false
      if (Object.keys(todo_list).indexOf(new_todo_date) !== -1) {
        //   있으면, 원래 있던 배열이랑 합친다.
        new_todo_list = {
          ...todo_list,
          [new_todo_date]: [...todo_list[new_todo_date], new_todo_data],
        };
      } else {
        // 없으면 그냥 넣는다.
        new_todo_list = { ...todo_list, [new_todo_date]: [new_todo_data] };
      }

      //   console.log(new_todo_list);
      // 3. 합친 걸 넣는다.
      return { ...state, todo_list: new_todo_list };
    }
    // 액션으로 받아오는 것 : date, todo_id, todo_data
    /**

    case "todo/UPDATE": {
      const { date, todo_id, todo_data } = action;
      // date와 todo_id를 이용해서 삭제할 일정 찾아서 삭제하기
      // 하나 복사합시다!
      const _new_todo_list = { ...state.todo_list };

      // 지울 일정이 있는 날짜! 그 날짜에 어떤 일정이 있나 가져옵니다.
      let todos = _new_todo_list[date];

      // 새 전체 일정이 여기 들어갈거예요.
      let new_todo_list = {};
     //날짜가 달라졌을 때
      // console.log(date === moment(todo_data.datetime).format("YYYY-MM-DD"));
      if (date === moment(todo_data.datetime).format("YYYY-MM-DD")) {
        // 날짜가 그대로일 때
        // 해당 일자 데이터에서 지울 일정을 고쳐줍니다.
        todos = todos.map((t) => {
          // 지울 일정의 todo_id와 todos 안에 있던 값의 todo_id를 비교
          // 만약 두 개가 같으면 새로 받아온 데이터로 덮어씀
          // 두 개가 다르면? 그대로 return해준다.
          if (t.todo_id === todo_id) {
            //   기존 내용에 고칠 내용을 덮어씌운다.
            return { ...t, ...todo_data };
          } else {
            return t;
          }
        });

        // 이제 새로운 일정 데이터 생성
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

      // 확인해보자!
      // console.log(new_todo_list);

      // 새 일정을 state에 넣어준다.
      return { ...state, todo_list: new_todo_list };
    }

    // 액션으로 받아오는 것 : date, todo_id

    case "todo/DELETE": {
      const { date, todo_id } = action;
      // date와 todo_id를 이용해서 삭제할 일정 찾아서 삭제하기

      const _new_todo_list = { ...state.todo_list };

      // 지울 일정이 있는 날짜
      let todos = _new_todo_list[date];

      // 해당 일자 데이터에서 지울 일정을 빼줍니다. (지울거 빼고 나머지만 가져오기)
      todos = todos.filter((t) => {
        // 지울 일정의 todo_id와 todos 안에 있던 값의 todo_id를 비교
        // 만약 두 개가 같으면 지워야하는 것
        // 두 개가 다르면? 그대로 todos에 남아야 한다.
        return t.todo_id !== todo_id;
      });

      // 이제 새로운 일정 데이터 생성
      const new_todo_list = { ..._new_todo_list, [date]: todos };

      // 새 일정을 state에 넣어준다.
      return { ...state, todo_list: new_todo_list };
    }
    case "todo/CHANGE_TODAY": {
      // action에서 받아오는 값 : date
      return { ...state, today: moment(action.date) };
    }

    default:
      return state;
  }
}

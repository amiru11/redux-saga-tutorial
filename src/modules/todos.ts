import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

export type TTodo = {
  id: number;
  content: string;
  done: boolean;
};

// Create Action Type
const GET_TODOS = 'todos/GET_TODOS';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';
// Create Saga Action Type
const GET_TODOS_ASYNC = 'todos/GET_TODOS_ASYNC';
const INSERT_ASYNC = 'todos/INSERT_ASYNC';
const TOGGLE_ASYNC = 'todos/TOGGLE_ASYNC';
const REMOVE_ASYNC = 'todos/REMOVE_ASYNC';
// Create Action funciton
const getTodos = createAction(GET_TODOS)<TTodo[]>();
const insert = createAction(INSERT)<string>();
const toggle = createAction(TOGGLE)<number>();
const remove = createAction(REMOVE)<number>();
// Create Saga Action funciton
// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록 undefined 함수 넘겨주기
export const getTodosAsync = createAction(GET_TODOS_ASYNC)();
export const insertAsync = createAction(INSERT_ASYNC)<string>();
export const toggleAsync = createAction(TOGGLE_ASYNC)<number>();
export const removeAsync = createAction(REMOVE_ASYNC)<number>();

// Declare Action Object Type
const actions = {
  getTodos,
  insert,
  toggle,
  remove,
};
// Declare Action type and state type
type TTodosAction = ActionType<typeof actions>;
type TTodosState = {
  todos: TTodo[];
};
// Create Saga function
function* getTodosSaga() {
  const todos = JSON.parse(localStorage.getItem('todos')) ?? [];
  console.log('todos', todos);
  yield delay(1000);
  yield put(getTodos(todos));
}
function* insertSaga({ payload: content }: ReturnType<typeof insert>) {
  yield put(insert(content));
}

function* toggleSaga({ payload: id }: ReturnType<typeof toggle>) {
  yield put(toggle(id));
}

function* removeSaga({ payload: id }: ReturnType<typeof remove>) {
  yield put(remove(id));
}

// Create Watch Saga functions
export function* watchTodos() {
  // takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리
  yield takeEvery(INSERT_ASYNC, insertSaga);
  yield takeEvery(GET_TODOS_ASYNC, getTodosSaga);
  // takeLatest는 기존에 진행 중이던 작업이 있다면 취소하고 마지막으로 실행된 작업만 수행
  yield takeLatest(TOGGLE_ASYNC, toggleSaga);
  yield takeLatest(REMOVE_ASYNC, removeSaga);
}
// Declare initialState
const initialState: TTodosState = {
  todos: [],
};
// Create Reducer
const reducer = createReducer<TTodosState, TTodosAction>(initialState, {
  [GET_TODOS]: (state, { payload: todos }) => {
    return { ...state, todos };
  },
  [INSERT]: (state, { payload: content }) => {
    const todos = state.todos;
    console.log(todos);
    const id = todos.length ? todos[todos.length - 1].id : 1;
    const todo: TTodo = {
      id,
      content,
      done: false,
    };
    return { ...state, todos: state.todos.concat(todo) };
  },
  [TOGGLE]: (state, { payload: id }) => {
    const todos = state.todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));
    return { ...state, todos };
  },
  [REMOVE]: (state, { payload: id }) => {
    const todos = state.todos.filter((todo) => todo.id !== id);
    return { ...state, todos };
  },
});

export default reducer;

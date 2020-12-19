import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects'; // Effect는 미들웨어에 의해 수행되는 명령을 담고 있는 평범한 자바스크립트 객체
// Saga는 Effect를 yield하고, Middleware는 Effect를 처리한다.

// Create Action Type
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_BY = 'counter/INCREASE_BY';
// Create Saga Action
const INCREASE_ASNYC = 'counter/INCREASE_ASNYC';
const DECREASE_ASNYC = 'counter/DECREASE_ASNYC';

// Create Action funciton
export const increase = createAction(INCREASE)();
export const decrease = createAction(DECREASE)();
export const increaseBy = createAction(INCREASE_BY)<number>();
// Create Saga Action funciton
// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록 undefined 함수 넘겨주기
export const increaseAsync = createAction(INCREASE_ASNYC, () => undefined)();
export const decreaseAsync = createAction(DECREASE_ASNYC, () => undefined)();

// Declare Action Object Type
const actions = {
  increase,
  decrease,
  increaseBy,
};
type TCounterAction = ActionType<typeof actions>; // ActionType을 통해서 모든 액션 객체들의 타입을 준비

type TCounterState = {
  count: number;
};

// Create Saga function
function* increaseSaga() {
  yield delay(1000);
  yield put(increase()); // 특정 액션을 디스패치 해준다.
}
function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease()); // 특정 액션을 디스패치 해준다.
}

export function* counterSaga() {
  // takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리
  yield takeEvery(INCREASE_ASNYC, increaseSaga);
  // takeLatest는 기존에 진행 중이던 작업이 있다면 취소하고 마지막으로 실행된 작업만 수행
  yield takeLatest(DECREASE_ASNYC, decreaseSaga);
}

const initialState: TCounterState = {
  count: 0,
};

// Create Reducer
const reducer = createReducer<TCounterState, TCounterAction>(initialState, {
  [INCREASE]: (state) => {
    return { count: state.count + 1 };
  },
  [DECREASE]: (state) => {
    return { count: state.count > 0 ? state.count - 1 : 0 };
  },
  [INCREASE_BY]: (state, action) => {
    return { count: state.count + action.payload };
  },
});

export default reducer;

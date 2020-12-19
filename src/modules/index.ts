// rootReducer 작성
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import counter, { watchCount } from 'modules/counter';
import todos, { watchTodos } from 'modules/todos';

const rootReducer = combineReducers({ counter, todos });

export function* rootSaga() {
  // all 함수를 통해 여러 사가를 합쳐준다.
  yield all([watchCount(), watchTodos()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

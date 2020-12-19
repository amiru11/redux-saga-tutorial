// rootReducer 작성
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import counter, { counterSaga } from 'modules/counter';

const rootReducer = combineReducers({ counter });

export function* rootSaga() {
  // all 함수를 통해 여러 사가를 합쳐준다.
  yield all([counterSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

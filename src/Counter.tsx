import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'modules';
import { increase, decrease, increaseBy, increaseAsync, decreaseAsync } from 'modules/counter';

function Counter() {
  const count = useSelector((state: RootState) => state.counter.count); // Get State from redux
  const dispatch = useDispatch(); // Get Dispatch from redux

  const onIncrease = () => {
    dispatch(increase());
  };
  const onDecrease = () => {
    dispatch(decrease());
  };
  const onIncreaseAsync = () => {
    dispatch(increaseAsync());
  };
  const onDecreaseAsync = () => {
    dispatch(decreaseAsync());
  };
  const onIncreaseBy = (count: number) => {
    dispatch(increaseBy(count));
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncreaseAsync}>+1 Async</button>
      <button onClick={onDecreaseAsync}>-1 Async</button>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <button onClick={() => onIncreaseBy(5)}>+5</button>
    </div>
  );
}

export default Counter;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'modules';
import { getTodosAsync, insertAsync } from 'modules/todos';

import Input from 'components/Input';

const { useState, useEffect } = React;

function Todos() {
  const todos = useSelector((state: RootState) => state.todos.todos); // Get State from redux
  const dispatch = useDispatch(); // Get Dispatch from redux
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const onInsert = (): void => {
    if (!inputValue) return;
    dispatch(insertAsync(inputValue));
  };

  // const onIncrease = () => {
  //   dispatch(increase());
  // };
  // const onDecrease = () => {
  //   dispatch(decrease());
  // };
  // const onIncreaseAsync = () => {
  //   dispatch(increaseAsync());
  // };
  // const onDecreaseAsync = () => {
  //   dispatch(decreaseAsync());
  // };
  // const onIncreaseBy = (count: number) => {
  //   dispatch(increaseBy(count));
  // };

  return (
    <div>
      <h1>🐹Todo List🐹</h1>
      <div className="input__wrapper">
        <Input inputValue={inputValue} setInputValue={setInputValue} />
        <button onClick={onInsert}>Submit</button>
      </div>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.content}</li>
          ))}
        </ul>
      ) : (
        <p>🐹Create your first Todo🐹</p>
      )}
    </div>
  );
}

export default Todos;

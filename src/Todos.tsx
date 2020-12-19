import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'modules';
import { getTodosAsync, insertAsync, toggleAsync, removeAsync } from 'modules/todos';

const { useEffect } = React;

function Todos() {
  const todos = useSelector((state: RootState) => state.todos.todos); // Get State from redux
  const dispatch = useDispatch(); // Get Dispatch from redux

  useEffect(() => {
    console.log(123);
    dispatch(getTodosAsync());
  }, [dispatch]);

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
      <h1>Todo List</h1>
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

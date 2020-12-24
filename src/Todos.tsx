import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'modules';
import { getTodosAsync, insertAsync, toggleAsync, removeAsync } from 'modules/todos';

import Input from 'components/Input';
import TodoItem from 'components/TodoItem';

const { useState, useCallback, useEffect } = React;

function Todos(): JSX.Element {
  const todos = useSelector((state: RootState) => state.todos.todos); // Get State from redux
  const dispatch = useDispatch(); // Get Dispatch from redux
  const [inputValue, setInputValue] = useState<string>('');

  useEffect((): void => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const onInsert = useCallback((): void => {
    if (!inputValue) return;
    dispatch(insertAsync(inputValue));
    setInputValue('');
  }, [dispatch, inputValue]);

  const onChangeStatus = useCallback(
    (id: number): void => {
      dispatch(toggleAsync(id));
    },
    [dispatch],
  );

  const onRemove = useCallback(
    (id: number): void => {
      dispatch(removeAsync(id));
    },
    [dispatch],
  );

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
            <TodoItem key={todo.id} todo={todo} onChangeStatus={onChangeStatus} onRemove={onRemove} />
          ))}
        </ul>
      ) : (
        <p>🐹Create your first Todo🐹</p>
      )}
    </div>
  );
}

export default Todos;

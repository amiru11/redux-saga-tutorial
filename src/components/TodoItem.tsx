import { TTodo } from 'modules/todos';

interface ITodoItem {
  todo: TTodo;
  onChangeStatus: (id: number) => void;
  onRemove: (id: number) => void;
}

function TodoItem({ todo, onChangeStatus, onRemove }: ITodoItem): JSX.Element {
  const onClickItem = (event: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    event.preventDefault();
    onChangeStatus(todo.id);
  };

  const onClickRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.stopPropagation();
    onRemove(todo.id);
  };

  return (
    <li onClick={onClickItem}>
      <p>{todo.content}</p>
      <button onClick={onClickRemove}>☠️</button>
    </li>
  );
}

export default TodoItem;

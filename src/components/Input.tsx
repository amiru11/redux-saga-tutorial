import React from 'react';

interface IInputProps {
  type?: string;
  inputId?: string;
  title?: string;
  inputValue: string;
  setInputValue: (value: string) => void;
}

function Input(props: IInputProps) {
  const { type = 'text', inputId = 'textInput', title = 'Todo', inputValue, setInputValue } = props;

  const onHandleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(target?.value ?? '');
  };

  return (
    <>
      <label htmlFor={inputId}>{title}</label>
      <input id={inputId} type={type} onChange={onHandleChange} value={inputValue} />
    </>
  );
}

export default Input;

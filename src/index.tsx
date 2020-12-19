import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'index.css';
import App from 'App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import rootReducer, { rootSaga } from 'modules';

const sagaMiddleware = createSagaMiddleware(); // Create Saga middleware with a list of Sagas to run
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware))); // Connect the Saga middleware to the Redux store
sagaMiddleware.run(rootSaga); // Start our Saga.

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

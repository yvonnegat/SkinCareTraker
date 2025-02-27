import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App';
import MenuProvider from './context/MenuContext';
import ListProvider from './context/ListContext';
//import { createStore, combineReducers, applyMiddleware, compose } from "redux";
//import thunk from "redux-thunk";
import { restoreCSRF, csrfFetch } from '../src/store/csrf';
import configureStore from './store';
import * as sessionActions from './store/session';


const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <MenuProvider>
      <ListProvider>
     <ReduxProvider store={store}>
       <BrowserRouter>
         <App />
       </BrowserRouter>
      </ReduxProvider>
      </ListProvider>
    </MenuProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// import {configureStore} from '@reduxjs/toolkit'
import { createStore, applyMiddleware } from "redux"
import { logger } from "redux-logger";
import { addElement } from './reducer/reducer';


function saveToLocalStorage(state) {
    try {
      const serialisedState = JSON.stringify(state);
      localStorage.setItem("persistantState", serialisedState);
    //   localStorage.clear();
    } catch (e) {
      console.warn(e);
    }
  }

  // load string from localStarage and convert into an Object
  // invalid output must be undefined
  function loadFromLocalStorage() {
    try {
      const serialisedState = localStorage.getItem("persistantState");
    //   localStorage.clear();
      if (serialisedState === null) return undefined;
      return JSON.parse(serialisedState);
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  }

const store = createStore(addElement, loadFromLocalStorage(), applyMiddleware(logger));

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
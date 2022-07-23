import { createStore, applyMiddleware } from "redux"
import { logger } from "redux-logger";
import { addElement } from './reducer/reducer';


function saveToLocalStorage(state) {
    try {
      const serialisedState = JSON.stringify(state);
      localStorage.setItem("myList", serialisedState);
    } catch (e) {
      console.warn(e);
    }
  }

  function loadFromLocalStorage() {
    try {
      const serialisedState = localStorage.getItem("myList");
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
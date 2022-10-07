import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {calcReducer} from "./reducers/calcReducer/calcReducer";
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger'

const rootReducer = combineReducers({
  calc: calcReducer,
});

const loggerMiddleware = createLogger();

// Подключаем compose для объединения миддлвар и DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer, 
  composeEnhancers(
    applyMiddleware(
      thunk,
      loggerMiddleware, // логируем экшены
    ) 
  ),
);

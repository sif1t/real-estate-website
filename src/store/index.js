import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  ...reducers,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)))
);

export default store;
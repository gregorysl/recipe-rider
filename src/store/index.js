import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/reducers';
import sagas from '../sagas/sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return {
    ...createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(sagaMiddleware))
    ),
    runSaga: sagaMiddleware.run
  };
  /* eslint-enable */
};

const store = configureStore();
store.runSaga(sagas);

export default store;

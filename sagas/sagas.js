import { all, fork } from 'redux-saga/effects';
import * as watch from './watcher';

const sagas = [
  fork(watch.watchAddRecipe),
  fork(watch.watchGetRecipes),
  fork(watch.watchAddProduct),
  fork(watch.watchGetProducts)
];

export default function* () {
  yield all(sagas);
}

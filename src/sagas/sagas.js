import { all, fork } from 'redux-saga/effects';
import * as watch from './watcher';

const sagas = [
  fork(watch.watchAddRecipe),
  fork(watch.watchGetRecipes),
  fork(watch.watchSaveProduct),
  fork(watch.watchGetProducts),
  fork(watch.watchGetMeasurements)
];

export default function* () {
  yield all(sagas);
}

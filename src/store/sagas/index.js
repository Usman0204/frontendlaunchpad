import { all } from 'redux-saga/effects';
import authSagas from './Auth.js';



export default function* rootSaga() {
  yield all([
    authSagas()
   
  ]);
}


import {fork} from 'redux-saga/effects';
import save from './save.js';


export default function*() {
  yield fork(save);
}

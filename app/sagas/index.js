import {fork} from 'redux-saga/effects';
import save from './save.js';
import fetchRepository from './fetchRepository.js';


export default function*() {
  yield fork(save);
  yield fork(fetchRepository);
}

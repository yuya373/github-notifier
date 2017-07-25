import {fork} from 'redux-saga/effects';
import save from './save.js';
import fetchRepository from './fetchRepository.js';
import fetchComments from './fetchComments.js';
import clear from './clear.js';
import timer from './timer.js';


export default function*() {
  yield fork(save);
  yield fork(clear);
  yield fork(fetchRepository);
  yield fork(fetchComments);
  yield fork(timer);
}

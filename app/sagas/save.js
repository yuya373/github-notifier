import {takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';

function* save() {
  console.log("save!!");
}

export default function* () {
  yield takeLatest(
    LOCATION_CHANGE,
    save
  )
}

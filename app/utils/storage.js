import storage from 'electron-json-storage';

const STATE = 'STATE';

export function saveState(state, error = undefined) {
  const callback = (err) => {
    if (err) throw err;
  };

  storage.set(STATE, state, error || callback);
}

export function fetchState(success) {
  const callback = (err, data) => {
    if (err) throw err;
    success(data);
  };
  storage.get(STATE, callback);
}

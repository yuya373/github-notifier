import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createBrowserHistory } from 'history';
import Root from './containers/Root';
import configureStore from './store/configureStore.js';
import {fetchState} from './utils/storage.js';

const history = createBrowserHistory();

fetchState(
  (initialState) => {
    const store = configureStore({savedState: initialState}, history);

    render(
      (
        <AppContainer>
          <Root store={store} history={history} />
        </AppContainer>
      ),
      document.getElementById('root')
    );

    if (module.hot) {
      module.hot.accept('./containers/Root', () => {
        const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
        render(
          <AppContainer>
            <NextRoot store={store} history={history} />
          </AppContainer>,
          document.getElementById('root')
        );
      });
    }
  }
);

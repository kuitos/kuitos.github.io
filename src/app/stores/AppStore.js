/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-11-09
 */
import React from 'react';

import {ActionTypes} from '../constants/AppConstants.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {MapStore} from 'flux/utils';
import Immutable from 'immutable';

class AppStore extends MapStore {

  getInitialState() {
    return Immutable.Map({
      loading: false
    });
  }

  reduce(state, action) {

    switch (action.type) {

      case ActionTypes.CHANGE_LOADING_STATUS:
        return state.set('loading', action.loading);

      default:
        return state;

    }

  }

}

export default new AppStore(AppDispatcher);

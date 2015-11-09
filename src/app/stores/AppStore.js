/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-11-09
 */
import React from 'react';

import BaseStore from './BaseStore.js';
import {ActionTypes} from '../constants/AppConstants.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

let loading = false;

let AppStore = Object.assign({

  getAppStatus(){
    return {loading};
  }

}, BaseStore);

AppDispatcher.register(action => {

  switch (action.type) {

    case ActionTypes.CHANGE_LOADING_STATUS:
      loading = action.loading;
      AppStore.emitChange();
      break;

    // no default

  }

});

export default AppStore;

/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-08-17
 */
import { ActionTypes } from '../constants/AppConstants.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import BaseStore from './BaseStore.js';

let _posts = [];

let IndexStore = Object.assign({

  getAll() {

    return {
      posts: _posts
    }
  }

}, BaseStore);

AppDispatcher.register(action => {

  switch (action.type) {

    // nav点击
    case ActionTypes.RECEIVE_POSTS:
      _posts = action.posts;
      IndexStore.emitChange();
      break;

    // no default
  }

});

export default IndexStore;

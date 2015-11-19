/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-08-17
 */
import { ActionTypes } from '../constants/AppConstants.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {MapStore} from 'flux/utils';
import Immutable from 'immutable';

class IndexStore extends MapStore {

  getInitialState() {
    return Immutable.Map({
      posts: []
    });
  }

  reduce(state, action) {

    switch (action.type) {

      // nav点击
      case ActionTypes.RECEIVE_POSTS:
        return state.set('posts', action.posts);

      default:
        return state;
    }

  }

}

export default new IndexStore(AppDispatcher);

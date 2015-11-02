/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-08-17
 */

import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

export default Object.assign({}, EventEmitter.prototype, {

  emitChange(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(cb){
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener(cb){
    this.removeListener(CHANGE_EVENT, cb);
  }

});

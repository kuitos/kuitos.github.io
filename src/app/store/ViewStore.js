import { observable } from 'mobx';
/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-12-06
 */

export default class ViewStore {

	@observable
	_loading = true;

	get loading() {
		return this._loading;
	}

	changeLoadingStatus(status) {
		this._loading = status;
	}
}

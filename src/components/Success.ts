import { ISuccessActions, ISuccessfulOrder } from '../types';
import { ICardActions } from './base/Card';
import { Component } from './base/Component';

export class SuccessfulOrder extends Component<ISuccessfulOrder> {
	protected _total: HTMLElement;
	protected _successfulButton: HTMLElement;

	constructor(protected container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._successfulButton = container.querySelector('.order-success__close');
		this._total = container.querySelector('.order-success__description');

		this._successfulButton.addEventListener('click', actions.onClick);
	}

	set total(value: string) {
		this.setText(this._total, `Списано ${value} синапсов`);
	}
}

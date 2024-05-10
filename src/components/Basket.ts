import { IBasket, IBasketProduct, IProductCard } from '../types';
import { createElement, ensureElement, isEmpty } from '../utils/utils';
import { ICardActions, ProductCard } from './base/Card';
import { Component } from './base/Component';
import { EventEmitter, IEvents } from './base/events';

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}

		this.addItems = [];
	}

	set addItems(items: HTMLElement[]) {
		this._list.replaceChildren(...items);
	}

	set total(total: number) {
		this.setText(this._total, total + ' синапсов');
	}

	disabledButton(value: number) {
		if (value !== 0) {
			this.setDisabled(this._button, false);
		} else {
			this.setDisabled(this._button, true);
		}
	}
}

export class BasketProduct extends ProductCard {
	protected _index: HTMLElement;
	protected _deleteButton: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._index = ensureElement<HTMLElement>(`.basket__item-index`, container);
		this._deleteButton = ensureElement<HTMLElement>(
			`.basket__item-delete`,
			container
		);

		if (actions?.onClick) {
			container.addEventListener('click', actions.onClick);
		}
	}

	setIndex(value: number) {
        this.setText(this._index, value)
	}
}

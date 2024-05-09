import { ICardElement } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from './Component';

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

interface Category {
	[key: string]: string;
}

const categoryObj: Category = {
	'софт-скил': '_soft',
	'хард-скил': '_hard',
	дополнительное: '_additional',
	кнопка: '_button',
	другое: '_other',
};

export class ProductCard extends Component<ICardElement> {
	protected _category: HTMLElement;
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _price: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);
		this._title = ensureElement<HTMLElement>(`.card__title`, container);
		this._image = container.querySelector(`.card__image`);
		this._category = container.querySelector(`.card__category`);
		this._price = container.querySelector(`.card__price`);

		if (actions?.onClick) {
			container.addEventListener('click', actions.onClick);
		}
	}

	// set id(value: string) {
	//     this.container.dataset.id = value;
	//   }

	//   get id(): string {
	//     return this.container.dataset.id || '';
	//   }

	set category(value: string) {
		this._category.textContent = value;
		this._category.classList.add(`card__category${categoryObj[value]}`);
	}

	set title(value: string) {
		this._title.textContent = value;
	}

	set price(value: number | null) {
		this._price.textContent = value === null ? 'Бесценно' : `${value} синапсов`;
	}

	set image(value: string) {
		this.setImage(this._image, value);
	}
}

export class PreviewCard extends ProductCard {
	protected _description: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);
		this._description = ensureElement<HTMLElement>(`.card__text`, container);
		this._button = container.querySelector(`.card__button`);

		if (actions?.onClick) {
			this._button.addEventListener('click', actions.onClick);
		}
	}

	set description(value: string) {
		this._description.textContent = value;
	}

	set disabled(value: boolean) {
		this.setDisabled(this._button, value);
	}

	set buttonName(value: string) {
		this._button.textContent = value;
	}
}

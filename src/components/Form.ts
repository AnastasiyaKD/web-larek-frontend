import { IForm, IFormAddress, IFormContscts, IOrder } from '../types';
import { ensureAllElements, ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class Form<T> extends Component<IForm> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}

	render(state: Partial<T> & IForm) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}

export class FormAddress extends Form<IFormAddress> {
	protected _paymentButtons: HTMLButtonElement[];
	protected _address: HTMLInputElement;

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
		this._paymentButtons = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			container
		);

		this._address = this.container.elements.namedItem(
			'address'
		) as HTMLInputElement;

		this._paymentButtons.forEach((button) => {
			button.addEventListener('click', () => {
				if (container.querySelector('.button_alt-active')) {
					this.toggleClass(
						container.querySelector('.button_alt-active'),
						'button_alt-active'
					);
				}
				button.classList.add('button_alt-active');
				this.payment = button.name;
			});
		});
	}

	set payment(value: string) {
		this.events.emit('payment:change', { payment: value });
	}

	set address(value: string) {
		this._address.value = value;
	}
}

export class FormContacts extends Form<IFormContscts> {
	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}
}

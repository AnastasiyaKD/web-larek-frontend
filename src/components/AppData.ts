import {
	IAppState,
	IProductCard,
	IOrder,
	FormErrors,
	IFormAddress,
	IFormContscts,
} from '../types';
import { Model } from './base/Model';

export class AppState extends Model<IAppState> {
	basketCatalog: IProductCard[] = [];
	catalog: IProductCard[];
	order: IOrder = {
		email: '',
		phone: '',
		address: '',
		total: 0,
		paymentMethod:'',
		items: [],
	};
	formErrors: FormErrors = {};

	get totalPrice(): number {
		return this.basketCatalog.reduce((a, item) => (a += item.price), 0);
	}
	setCatalog(item: IProductCard[]) {
		this.catalog = item;
		this.emitChanges(`item:change`, { catalog: this.catalog });
	}

	setBasketProduct(item: IProductCard) {
		this.basketCatalog.push(item);
	}
    
	deleteBasketItem(itemToRemove: IProductCard) {
		this.basketCatalog = this.basketCatalog.filter(
			(item) => item !== itemToRemove
		);
	}

	includeItem(item: IProductCard) {
		return this.basketCatalog.includes(item);
	}

	clearBasket() {
		this.basketCatalog = [];
	}

	cleanInputs() {
		this.order.paymentMethod = null;
		this.order.address = '';
		this.order.email = '';
		this.order.phone = '';
	}

	setOrderItems() {
		this.order.items = this.basketCatalog.map((el) => el.id);
	}

	setFormAddress(field: keyof IFormAddress, value: string) {
		if (field === 'paymentMethod' && (value === 'card' || value === 'cash')) {
			this.order[field] = value;
		} else if (field !== 'paymentMethod') {
			this.order[field] = value;
		}

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	setFormContacts(field: keyof IFormContscts, value: string) {
		this.order[field] = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
        if (!this.order.paymentMethod)
			errors.paymentMethod
         = 'Необходимо указать способ оплаты';
		if (!this.order.address) {
			errors.address = 'Необходимо указать адресс';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateContacts() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}

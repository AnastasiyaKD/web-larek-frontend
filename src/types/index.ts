export interface IProductCard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IPage {
	basket: HTMLElement;
	catalog: HTMLElement[];
	basketCounter: HTMLElement;
}

export interface ICardElement {
	category: string;
	title: string;
	image: string;
	price: number | null;
	description?: string;
}

//Интерфейс корзины
export interface IBasket {
	productList: HTMLElement[];
	total: number;
}

//Интерфейс товара
export interface IBasketProduct {
	index: number;
	title: string;
	price: number;
}

//Интерфейс формы
export interface IForm {
	valid: boolean;
	errors: string[];
}

//Интерфейс формы способа оплаты и адреса
export interface IFormAddress {
	paymentMethod: string;
	address: string;
}

//Интерфейс формы данных о пользователе
export interface IFormContscts {
	email: string;
	phone: string;
}

//Интерфейс Успешного оформления заказа
export interface ISuccessfulOrder {
	total: number;
}

//Интерфейс определяющий структуру объекта, содержащего действие
export interface ISuccessActions {
	onClick: () => void;
}

export interface IOrder {
	paymentMethod: string;
	address: string;
	email: string;
	phone: string;
	total: number;
	items: string[];
}

export interface IAppState {
	catalog: IProductCard[];
    order: IOrder | null
}







export type FormErrors = Partial<Record<keyof IOrder, string>>;

export type PaymentMethods = 'card' | 'cash';

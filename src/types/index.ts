export interface ICardApi {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IAppState {
	catalog: ICardApi[];
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

interface IModalData {
    content: HTMLElement;
}

//Интерфейс корзины 
interface IBusket {
    productList: HTMLElement[];
    total: string;
}

//Интерфейс товара
interface IBusketProduct{
    index: number;
    title: string;
    price: string;
}
//Интерфейс формы способа оплаты и адреса
interface IFormAddress {
    paymentMethod: string;
    address: string;
}

//Интерфейс формы данных о пользователе
 interface IFormDataUser {
     email: string;
     phone: string;
 }
 
 //Интерфейс Успешного оформления заказа 
 interface successfulOrder {
     total: string;
 }

//Интерфейс определяющий структуру объекта, содержащего действие
interface ISuccessActions {
    onClick: () => void;
}
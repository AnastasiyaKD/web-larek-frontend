import './scss/styles.scss';

import { CDN_URL, API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { CardsAPI } from './components/CardsAPI';
import { AppState } from './components/AppData';
import { Page } from './components/Page';
import { PreviewCard, ProductCard } from './components/base/Card';
import { cloneTemplate, ensureElement } from './utils/utils';
import {
	IBasketProduct,
	IFormAddress,
	IFormContscts as IFormContacts,
	IProductCard,
} from './types';
import { Modal } from './components/Modal';
import { Basket, BasketProduct } from './components/Basket';
import { FormAddress, FormContacts } from './components/Form';
import { SuccessfulOrder } from './components/Success';

const api = new CardsAPI(CDN_URL, API_URL);
const events = new EventEmitter();

//Все шаблоны
const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const templatePreviewCard = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const basketProdactTemplate =
	ensureElement<HTMLTemplateElement>('#card-basket');
const formAddressTemplate = ensureElement<HTMLTemplateElement>('#order');
const formContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

//Модель данных
const appData = new AppState({}, events);

//Глобальные константы
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

//Переиспользуемые части
const basket = new Basket(cloneTemplate(basketTemplate), events);
const formAddress = new FormAddress(cloneTemplate(formAddressTemplate), events);
const formContacts = new FormContacts(
	cloneTemplate(formContactsTemplate),
	events
);

events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

//Вывод карточек
events.on(`item:change`, () => {
	page.catalog = appData.catalog.map((item: IProductCard) => {
		const card = new ProductCard(cloneTemplate(cardTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			category: item.category,
			image: item.image,
			price: item.price,
		});
	});
});

//Превью карточки
events.on('card:select', (item: IProductCard) => {
	modal.open();
	const previewCard = new PreviewCard(cloneTemplate(templatePreviewCard), {
		onClick: () => events.emit('item:addToBusket', item),
	});

	if (appData.includeItem(item)) {
		previewCard.disabled = true;
		previewCard.buttonName = ' Уже в корзине';
	}

	if (!item.price) {
		previewCard.disabled = true;
	}

	return modal.render({
		content: previewCard.render({
			title: item.title,
			category: item.category,
			image: item.image,
			price: item.price,
			description: item.description,
		}),
	});
});

//Открытие корзины
events.on('bids:open', (item: IBasketProduct) => {
	basket.disabledButton(appData.basketCatalog.length);
	modal.open();
	return modal.render({
		content: basket.render({}),
	});
});

//Добавление товара в корзину
events.on('item:addToBusket', (item: IProductCard) => {
	appData.setBasketProduct(item);
	modal.close();
	events.emit('basket:changed');
});

//Удаление товара из корзины
events.on('item:remuveFromBusket', (item: IProductCard) => {
	appData.deleteBasketItem(item);
	events.emit('basket:changed');
});

//Изменения в корзине
events.on('basket:changed', () => {
	let i = 1;
	basket.addItems = appData.basketCatalog.map((item) => {
		const card = new BasketProduct(cloneTemplate(basketProdactTemplate), {
			onClick: () => events.emit('item:remuveFromBusket', item),
		});

		card.setIndex(i++);

		return card.render({
			title: item.title,
			price: item.price,
		});
	});
	basket.total = appData.totalPrice;
	page.counter = appData.basketCatalog.length;
	basket.disabledButton(appData.basketCatalog.length);
    appData.total = appData.totalPrice
    appData.itemOrder()
});

//Открытие формы с способом оплаты и аддресом
events.on('order:open', () => {
	modal.render({
		content: formAddress.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

//Открытие формы с контактными данными
events.on('order:submit', () => {
	modal.render({
		content: formContacts.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('payment:change', (data: { payment: string }) => {
	appData.setFormAddress('payment', data.payment);
});

events.on(
	/^order\..*:change/,
	(data: { field: keyof IFormAddress; value: string }) => {
		appData.setFormAddress(data.field, data.value);
		appData.order.items;
	}
);

events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IFormContacts; value: string }) => {
		appData.setFormContacts(data.field, data.value);
		appData.order.items;
	}
);

//Состояние валидации
events.on(
	'formErrors:change',
	(errors: Partial<IFormAddress & IFormContacts>) => {
		const { email, phone, address, payment } = errors;
		formContacts.valid = !email && !phone;
        formAddress.valid = !address && !payment;
		formAddress.errors = Object.values({ address, payment})
			.filter((i) => !!i)
			.join('; ');
		formContacts.errors = Object.values({ phone, email })
			.filter((i) => !!i)
			.join('; ');
		
	}
);

//Отправка формы заказа
events.on('contacts:submit', () => {
//	appData.setOrderItems();
	api
		.postOrder(appData.order)
		.then((data) => {
			appData.clearBasket();
			appData.cleanInputs();
			page.counter = 0;
			const success = new SuccessfulOrder(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
				},
			});
			modal.render({
				content: success.render({
					total: data.total,
				}),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

// блокируем прокрутку страницы
events.on('modal:open', () => {
	page.locked = true;
});

// разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

//Получаем товары с сервера
api
	.getCardsList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});

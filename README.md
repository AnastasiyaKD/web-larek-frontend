# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Ключевые типы данных 
```typescript
// Интерфейс данных с сервера
interface IProductCard {
    id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}
//Интерфейс страницы
interface IPage {
    basket: HTMLElement;
    catalog: HTMLElement[];
    basketCounter: HTMLElement;
}
//Интерфейс карточки и превью карточки 
interface ICardElement {
    category: string;
    title: string;
    image: string;
    price: number | null;
    description?: string;
}

//Интерфейс модального окна 
interface IModalData {
    content: HTMLElement;
}

//Интерфейс корзины 
interface IBusket {
    productList: HTMLElement[];
    total: number;
}

//Интерфейс товара
interface IBusketProduct{
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
```
## Описание классов
Создаем проект на основе nvp паттерна, где n - model, v - view, p - presenter.
### Базовые классы
abstract class Model<T>  Базовая модель, чтобы можно было отличить ее от простых объектов с данными.
Конструктор принимает такие аргументы:
1. data: Partial<T> - объект с данными.
2. protected events: IEvents - объект с событиями.
 
Класс имеет такие методы:
1. emitChanges - Сообщает всем что модель поменялась

abstract class Component<T> Инструментарий для работы с DOM в дочерних компонентах
Конструктор принимает такие аргументы:
1. protected readonly container: HTMLElement - Родительский HTMLElement .
 
Класс имеет такие методы:
1. toggleClass — переключает класс
2. setText — устанавливает текстовое содержимое
3. setDisabled — меняет статус блокировки
4. setHidden — делает скрытым
5. setVisible — делает видимым
6. setImage — устанавливает изображение с алтернативным текстом
7. render — возвращает корневой DOM-элемент

class Api - Работа с сервером
Класс иммеет такие свойства:
1. baseUrl: string - адресс сервера.
2. options: RequestInit = {} - содержит параметры для отправки запроса.

Конструктор принимает такие аргументы:
1. protected readonly container: HTMLElement - Родительский HTMLElement .
 
Класс имеет такие методы:
1.protected handleResponse - обработка ответа, полученного после выполнения запроса.
2.get(uri: string) - получение данных  с сервера.
3.post(uri: string, data: object, method: ApiPostMethods = 'POST') - отправка данных на сервер.

### Model
class AppState extends Model<IAppState> - класс для работы с данными
Класс имеет такие свойства:
1. catalog: IProductCard[] - каталог товаров
2.basketCatalog: IProductCard[] = [] - корзина товаров
3. order: IOrder = {
        email: '',
        phone: '',
        address: '',
        paymentMethod: '',
        items: []
    } - данные о заказе
4. formErrors: FormErrors = {} - ошибки валидации

Класс имеет такие методы:
1. setCatalog - добавление в каталог товаров
2. setBasketProduct() - добавление в корзину товаров
3. deleteBusketItem() - удаление товара из корзины
4.  clearBasket() - очищение корзины
5.  cleanInputs() - очищение полей
6.  get totalPrice() - подсчет общей стоимости товаров
7. setFormAddress-() - Сохренение данных адресса и способа оплаты
8. setFormContacts() -  Сохранение контактных данных
9.  validateOrder() - валидация формы с адресом и способом оплаты
10.  validateContacts() - валидация формы с контактами
 

### View
class Page extends Component<IPage> - класс для работы с объектами страницы
Класс имеет такие свойства:
1. protected _basketCounter: HTMLElement - счетчик товаров в корзине
2. protected _catalog: HTMLElement - каталог товаров
3. protected _wrapper: HTMLElement - 
4. protected _basket: HTMLElement - корзина

Конструктор принимает такие аргументы:
1. container: HTMLElement - контейнер для размещения элементов
2. protected events: IEvents - объект события

Класс имеет такие методы:
1. set counter - установка счетчика товаров
2.  set catalog - установка элемента каталога
3.  set locked - установка заблокированного состояния страницы

class СardsAPI extends Api implements ICardsAPI - класс для работы с данными с сервера, расширяет класс Api
Класс имеет такие свойства:
1. readonly cdn: string - хранит URL для контента, который будет использоваться в классе.

Конструктор принимает такие аргументы:
1. cdn: string - URL для контента
2. baseUrl: string - базовый URL для обращения к API
3. options?: RequestInit - дополнительные опции для настройки запросов

Класс имеет такие методы:
1. getCardsList - Выполняет GET-запрос на ресурс
2. postOrder - отправка данных о заказе

export class ProductCard extends Component<ICardElement> - класс для работы с карточкой товара
Класс имеет такие свойства:
1. protected _category: HTMLElement - категория товара
2. protected _title: HTMLElement - заголовак товара
3. protected _image: HTMLImageElement - изобрадение товара
4. protected _price: HTMLElement - цена товара

Конструктор принимает такие аргументы:
1. container: HTMLElement - элемент для размещения карточки товара
2. actions?: ICardActions - (необязательный) действия которые привязаны к карточке товара
 
Класс имеет такие методы:
1. set category - устанавливает категорию товара
2. set title - устанавливает заголовок товара
3. set image - устанавливает изображение товара
4. set price - устанавливант цену товара

class PreviewCard extends ProductCard - класс для работы с карточкой товара в модальном окне
Класс имеет такие свойства:
1. protected _description: HTMLElement - описание товара
2. protected _button: HTMLElement - кнопка добавления в корзину

Конструктор принимает такие аргументы:
1. container: HTMLElement - элемент для размещения карточки товара
2. actions?: ICardActions - действия которые привязаны к карточке товара
 
Класс имеет такие методы:
1. set description - устанавливает описание товара
2. set disabled - устанавливает неактивное состояние кнопки добавления в корзину
3. set buttonName - меняет имя кнопки товара который уже добавлен в корзину


class Modal extends Component<IModalData> - класс для работы с модальным окном
Класс имеет такие свойства:
1. protected _closeButton: HTMLButtonElement - кнопка закрытия модального окна
2. protected _content: HTMLElement - элемент содержимого модального окна

Конструктор принимает такие аргументы:
1. container: HTMLElement - HTML-элемент, в который будет добавлено модальное окно
2. protected events: IEvents - Объект событий, используемый для обработки событий модального окна
 

Класс имеет такие методы:
1. set content - Устанавливает содержимое модального окна
2. open - Открытие модального окна
3. close - Закрытие модального окна
4. render - Отрисовка модального окна с переданными данными

class Basket extends Component<IBasket>  - класс для работы с корзиной товаров
Класс имеет такие свойства:
1.  protected _list: HTMLElement - список выбранных товаров
2.  protected _total: HTMLElement - общая стоимость товаров в корзине
3.  protected _button: HTMLElement - кнопка оформления заказа

Конструктор принимает такие аргументы:
1. container: HTMLElement - контейнер  
2. protected events: IEvents

Класс имеет такие методы:
1. set addItems - добавление элементов в корзину
2. set totalPrice - установка общей стоимости товаров
3. disabledButton - установка не активного состояния кнопки, если корзина пуста

class BasketProduct extends ProductCard- класс для работы с элеменами товаров в корзине
Класс имеет такие свойства:
1. protected _index: HTMLElement - номер товара в корзине
2. protected _deleteButton: HTMLElement; - кнопка удаления товара из корзины

Конструктор принимает такие аргументы:
1. container: HTMLElement - контейнер для размещения элементов 
2. actions?: ICardActions

Класс имеет такие методы: 
1. setIndex - установка порядкового номера товара


class Form<T> extends Component<IForm>- класс для работы с формами
Класс имеет такие свойства:
1. protected _submit: HTMLButtonElement;
2. protected _errors: HTMLElement;

Конструктор принимает такие аргументы:
1. protected container: HTMLElement - контейнер для размещения элементов 
2. protected events: IEvents - объект события

Класс имеет такие методы:
1. set valid - установка не активного состояния кнопки, если есть ошибки в заполнении
2. set errors - установка текста ошибок в формах 
3. render - отображение состояния формы
4. protected onInputChange - валидация формы

class class FormAddress extends Form<IFormAddress> - класс для работы с формой способа оплаты  и адреса
Класс имеет такие свойства:
1. protected _paymentButtons: HTMLButtonElement[] - кнопки выбора оплаты
2. protected _address: HTMLInputElement - поле ввода адреса
 
Конструктор принимает такие аргументы:
1. protected container: HTMLElement - контейнер для размещения элементов 
2. protected events: IEvents - объект события

Класс имеет такие методы:
1. set payment - установка значения выбора способа оплаты
2. set address - учтановка значения поля адреса

class FormContacts extends Form<IFormContscts> - класс для работы с формой, содержащей контактную информацию о пользователе

Конструктор принимает такие аргументы:
1. protected container: HTMLElement - контейнер для размещения элементов 
2. protected events: IEvents - объект события

Класс имеет такие методы:
1. set email - установка значения в поле email
2. set phone - установка значения в поле телефон
 

class SuccessfulOrder extends Component<ISuccessfulOrder>- класс для работы с успешным оформлением заказаэ

Класс имеет такие свойства:
1. protected _total:  HTMLElement - сумма списанных денежных средств
2.  protected _successfulButton:  HTMLElement - кнопка для выхода на главное меню

Конструктор принимает такие аргументы:
1. protected container: HTMLElement - элемент HTML в который будет помещен компонент
2. actions?: ICardActions - объект, содержащий действия

Класс имеет такие методы:
1. set _total - устанавливает значение потраченных денежных средств


## Presenter

// Все события 
enum Events :
`item:change` - передает обновленный каталог,
`card:select` - передает информацию о выбранной карточке продукта для дальнейшей обработки
`modal:open` - открывает модальное окно
`modal:close`- закрывает модальное окно
`bids:open` - открытие корзины
`item:addToBusket` - добавление товара в корзину
`item:remuveFromBusket` - удаление товара из корзины
`basket:changed` - изменения в корзине
`order:open` - Открытие формы с способом оплаты и аддресом
`order:submit`- Открытие формы с контактными данными
`payment:change` - выбор способа оплаты
`contacts:submit` - Отправка формы заказа
`formErrors:change` - состояние валидации










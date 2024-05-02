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
interface ICardApi {
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
1. catalog: ICard[] - каталог товаров
2. basket: string[] - корзина товаров
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
2. setBusket() - добавление в корзину товаров
3. deleteBusketItem() - удаление товара из корзины
4.  clearBasket() - очищение корзины
5.  getTotal() - подсчет общей стоимости товаров
6.  setOrder() - 
7.  validateOrder() - валидация данных заказа

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

Конструктор принимает такие аргументы:
1. container: HTMLElement - элемент для размещения карточки товара
 
Класс имеет такие методы:
1. set description - устанавливает описание товара


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

class Busket - класс для работы с корзиной товаров
Класс имеет такие свойства:
1.  protected _list: HTMLElement - список выбранных товаров
2.  protected _total: HTMLElement - общая стоимость товаров в корзине
3.  protected _button: HTMLElement - кнопка оформления заказа

Конструктор принимает такие аргументы:
1. container: HTMLElement - контейнер  
2. protected events: EventEmitter

Класс имеет такие методы:
1. set addItems - добавление элементов в корзину
2. set totalPrice - установка общей стоимости товаров
3. disabledButton - установка не активного состояния кнопки, если корзина пуста

class busketProduct - класс для работы с элеменами товаров в корзине
Класс имеет такие свойства:
1. protected _index: HTMLElement - номер товара в корзине
2. protected _title: HTMLElement - заголовок товара
3. protected _price: HTMLElement - цена товара

Конструктор принимает такие аргументы:
1. container: HTMLElement - контейнер для размещения элементов 

Класс имеет такие методы: 
1. setIndex - установка порядкового номера товара
2. set title - установка заголовка товара
3. set price - установка цены товара

class Form - класс для работы с формами
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

class FormOrderAddress - класс для работы с формой способа оплаты  и адреса
Класс имеет такие свойства:
1. protected _paymentMethod: HTMLElement - выбор способа оплаты
2.  protected _inputAddress: HTMLElement - поле ввода адреса
3.  protected _button: HTMLElement - кнопка отправки формы
 

Конструктор принимает такие аргументы:
1. protected container: HTMLElement - контейнер для размещения элементов 
2. protected events: IEvents - объект события

Класс имеет такие методы:
1. set paymentMethod - установка значения выбора способа оплаты
2. set address - учтановка значения поля адреса

class FormOrderDataUser - класс для работы с формой, содержащей контактную информацию о пользователе
Класс имеет такие свойства:
1. protected _email: HTMLElement - email пользователя
2. protected _phone: HTMLElement - контактный телефон пользователя
3. protected _button: HTMLElement - кнопка отправки формы

Конструктор принимает такие аргументы:
1. protected container: HTMLElement - контейнер для размещения элементов 
2. protected events: IEvents - объект события

Класс имеет такие методы:
1. set email - установка значения в поле email
2. set phone - установка значения в поле телефон
 

class SuccessfulOrder - класс для работы с успешным оформлением заказаэ

Класс имеет такие свойства:
1. protected _total:  HTMLElement - сумма списанных денежных средств
2.  protected _successfulButton:  HTMLElement - кнопка для выхода на главное меню

Конструктор принимает такие аргументы:
1. protected container: HTMLElement - элемент HTML в который будет помещен компонент
2. actions: ISuccessActions - объект, содержащий действия

Класс имеет такие методы:
1. set _total - устанавливает значение потраченных денежных средств
2. close - выход в главное меню

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
`form:continue` - продолжить оформление 
`form:pay` - оплатить заказ
`form:success` - завершение оформления 










import { Api, ApiListResponse } from './base/api';
import { IProductCard, IOrder } from '../types';

export interface ICardsAPI {
	getCardsList: () => Promise<IProductCard[]>;
}

export class CardsAPI extends Api implements ICardsAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getCardsList(): Promise<IProductCard[]> {
		return this.get('/product').then((data: ApiListResponse<IProductCard>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	postOrder(value: IOrder): Promise<IOrder> {
		return this.post('/order', value).then((data: IOrder) => data);
	}
}

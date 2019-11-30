export interface IOrder {
  item_id: number;
  count: number
  name: string;
  description: string;
  price: number;
}

export interface IGetOrderResponse {
  order: IOrder[];
}

export interface IOrderInitialState {
  [key: string]: {
    id: number;
    count: number
    name: string;
    description: string;
    price: number;
  }
}

export interface IOrderState extends IOrderInitialState {}

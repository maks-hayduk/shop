import { IGetOrderResponse } from "./types";

export const parseOrderResponse = (response: IGetOrderResponse) => {
  const normalizedResponse: any = {};

  response.order && response.order.map(item => {
    const { item_id, ...element } = item;
    normalizedResponse[item_id] = {...element, count: +element.count, id: item_id};
  })

  return normalizedResponse;
}
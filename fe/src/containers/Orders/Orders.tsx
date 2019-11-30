import * as React from 'react';

import { styled } from 'theme';

import { Item } from './Item';
import { IOrderSelect, DeleteItemFromOrderAction, IOrderState } from 'store';

const Wrapper = styled.div`
  max-width: 90%;
  margin: 40px auto;

  .order {
    width: 100%;
  }
`;

interface IOrderComponent {
  order: IOrderSelect;
  delItemFromOrderAction: DeleteItemFromOrderAction;
}

const OrderComponent: React.FC<IOrderComponent> = ({ order, delItemFromOrderAction }) => {
  return (
    <Wrapper>
      <div className="order">
        {order && Object.values(order).map(item => item.count > 0 &&
          <Item
            name={item.name}
            description={item.description}
            count={item.count}
            price={item.price}
            onClick={() => delItemFromOrderAction(item.id)}
          />
        )}
      </div>
    </Wrapper>
  )
}

export default OrderComponent;

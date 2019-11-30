import * as React from 'react';

import { H2, H3, TextButton } from 'components';
import { styled } from 'theme';

const ItemWrapper = styled.div`
  max-width: 900px;
  height: 60px;
  border-radius: 10px;
  margin: 20px auto;
  padding: 10px 20px;
  
  border: 1px solid black;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .title {
    width: 140px;
    text-align: left;
  }

  .description {
    width: 250px;
    text-align: left;
  }

  .price-wrapper {
    display: flex;

    .price {
      text-align: left;
      width: 100px;
    }
  }

  .total {
    width: 120px;
  }
  
  .del-button {
    margin-left: 30px;
  }
`;

interface IItem {
  name: string;
  description: string;
  price: number;
  count: number;
  onClick: () => void;
}

export const Item: React.FC<IItem> = ({
  name,
  price,
  count,
  onClick
}) => {
  return (
    <ItemWrapper>
      <H2 className="title">{name}</H2>
      <div className="price-wrapper">
        <H3 className="price">{price}</H3>
        <H3 className="price">Count: {count}</H3>
      </div>
      <H3 className="total">Total: {(price * count).toFixed(2)} $</H3>
      <TextButton onClick={onClick} className="del-button">Delete 1 item</TextButton>
    </ItemWrapper>
  )
}
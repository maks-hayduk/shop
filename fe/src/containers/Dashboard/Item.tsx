import * as React from 'react';

import { H2, H3, TextButton } from 'components';
import { styled } from 'theme';

const ItemWrapper = styled.div`
  width: 300px;
  min-height: 100px;
  border-radius: 10px;
  margin: 20px;
  padding: 10px 20px;
  
  border: 1px solid black;

  display: flex;
  flex-direction: column;

  .title {
    margin: 10px 0;
    max-width: 70%;
    white-space: no-wrap;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .del-button {
      color: ${({ theme }) => theme.color.red};
    }
  }

  .price {
    margin: 20px 0;
    text-align: center;
  }
`;

interface IItem {
  name: string;
  description: string;
  price: number;
  stock: number;
  onClick: () => void;
  delClick: () => void;
  isAdmin: boolean;
}

export const Item: React.FC<IItem> = ({
  name,
  description,
  price,
  stock,
  onClick,
  delClick,
  isAdmin
}) => {
  return (
    <ItemWrapper>
      <div className="header">
        <H2 className="title">{name}</H2>
        {isAdmin && <TextButton className="del-button" onClick={delClick}>delete</TextButton>}
      </div>
      <H3>{description}</H3>
      <H3 className="price">{price}$  &nbsp; &nbsp; Count: {stock}</H3>
      <TextButton onClick={onClick}>Add to order</TextButton>
    </ItemWrapper>
  )
}
import * as React from 'react';

import { Pagination } from 'components';
import { GetItems, IItem, IMetaDataSelect, HandleChangePageAction, AddItemToOrderAction } from 'store';
import { styled } from 'theme';

import { Item } from './Item';

const Wrapper = styled.div`
  max-width: 90%;
  margin: 40px auto;

  .items-wrapper {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .pagination-buttons{
    display: flex;
    justify-content: center;
    margin: 30px 0;
  }
`;

interface IDashboard {
  getItemsAction: GetItems;
  items: IItem[] | undefined;
  meta: IMetaDataSelect;
  handleChangePageAction: HandleChangePageAction;
  addItemToOrderAction: AddItemToOrderAction;
}

const Dashboard: React.FC<IDashboard> = ({ getItemsAction, items, meta, handleChangePageAction, addItemToOrderAction }) => {
  React.useEffect(() => {
    getItemsAction(1, meta.perPage);
  }, [])

  return (
    <Wrapper>
      <div className="items-wrapper">
        {items && items.map(el => (
          <div id={el.id.toString()}>
            <Item
              name={el.name}
              description={el.description}
              price={el.price}
              stock={el.stock}
              onClick={() => addItemToOrderAction(el.id, el)}
            />
          </div>
        ))}
      </div>
      <Pagination
        className="pagination-buttons"
        firstActivePage={meta.page}
        totalPages={meta.pages}
        onPageChange={(page: number) => handleChangePageAction(page)}
      />
    </Wrapper>
  )
}

export default Dashboard;

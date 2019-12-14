import * as React from 'react';
import ReactModal from 'react-modal';

import { Pagination, Button } from 'components';
import { GetItems, IItem, IMetaDataSelect, HandleChangePageAction, AddItemToOrderAction, AddItemAction, DeleteItemAction } from 'store';
import { styled } from 'theme';

import { Item } from './Item';
import { AddItemModal } from './AddItemModalContent';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

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
  userRole: string;
  addItemAction: AddItemAction;
  deleteItemAction: DeleteItemAction;
}

const Dashboard: React.FC<IDashboard> = ({
  getItemsAction,
  items,
  meta,
  handleChangePageAction,
  addItemToOrderAction,
  userRole,
  addItemAction,
  deleteItemAction
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    getItemsAction(1, meta.perPage);
  }, [])

  return (
    <Wrapper>
      {userRole === 'admin' && (
        <>
          <ReactModal
            isOpen={isOpen}
            style={customStyles}
            onRequestClose={() => setIsOpen(false)}
          >
            <AddItemModal
              setIsOpen={setIsOpen}
              addItemAction={addItemAction}
              getNewItems={() => getItemsAction(1, meta.perPage)}
            />
          </ReactModal>
          <Button onClick={() => setIsOpen(true)}>Add item</Button>
        </>
      )}
      <div className="items-wrapper">
        {items && items.map(el => (
          <div id={el.id.toString()}>
            <Item
              name={el.name}
              description={el.description}
              price={el.price}
              stock={el.stock}
              onClick={() => addItemToOrderAction(el.id, el)}
              delClick={() => deleteItemAction(el.id)}
              isAdmin={userRole === 'admin'}
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

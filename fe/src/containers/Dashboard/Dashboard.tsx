import * as React from 'react';
import ReactModal from 'react-modal';

import { Pagination, Button } from 'components';
import { GetItems, IItem, IMetaDataSelect, HandleChangePageAction, AddItemToOrderAction, AddItemAction, DeleteItemAction, UpdateItemAction } from 'store';
import { styled } from 'theme';

import { Item } from './Item';
import { AddItemModal } from './AddItemModalContent';
import { UpdateItemModal } from './UpdItemModalContent';

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

  .add-item {
    width: 250px;
  }

  .add-item-button {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
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
  updateItemAction: UpdateItemAction;
}

const Dashboard: React.FC<IDashboard> = ({
  getItemsAction,
  items,
  meta,
  handleChangePageAction,
  addItemToOrderAction,
  userRole,
  addItemAction,
  deleteItemAction,
  updateItemAction
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState();
  const [updItemId, setUpdItemId] = React.useState(0);

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
          >{modalType === 'add_item' ? (
            <AddItemModal
              setIsOpen={setIsOpen}
              addItemAction={addItemAction}
              getNewItems={() => getItemsAction(1, meta.perPage)}
            />
          ) : modalType === 'upd_item' ? (
            <UpdateItemModal
              setIsOpen={setIsOpen}
              updateItemAction={updateItemAction}
              itemId={updItemId}
              itemInfo={items ? items.find(el => el.id === updItemId) : undefined}
            />
          ) : null}
          </ReactModal>
          <div className="add-item-button">
            <Button 
              onClick={() => {
                setModalType('add_item')
                setIsOpen(true);
              }}
              className="add-item"
            >
              Add item
            </Button>
          </div>
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
              updClick={() => {
                setModalType('upd_item');
                setUpdItemId(el.id);
                setIsOpen(true);
              }}
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

import DashboardComponent from './Dashboard';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import {
  IStoreState,
  getItemsAction,
  selectItems,
  selectMetaData,
  handleChangePageAction,
  addItemToOrderAction,
  selectUserRole,
  addItemAction,
  deleteItemAction
} from 'store';

const mapStateToProps = (state: IStoreState) => ({
  items: selectItems(state),
  meta: selectMetaData(state),
  userRole: selectUserRole(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getItemsAction,
      handleChangePageAction,
      addItemToOrderAction,
      addItemAction,
      deleteItemAction
    },
    dispatch
  );

export const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

export default DashboardContainer;
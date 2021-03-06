import OrderComponent from './Orders';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import {
  IStoreState,
  selectOrder,
  delItemFromOrderAction,
  getOrderAction,
  
} from 'store';

const mapStateToProps = (state: IStoreState) => ({
  order: selectOrder(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      delItemFromOrderAction,
      getOrderAction
    },
    dispatch
  );

export const OrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderComponent);

export default OrderContainer;
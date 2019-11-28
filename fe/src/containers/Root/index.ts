import RootContainer from './Root';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import {
  selectUserName, IStoreState, handleInitAction
} from 'store';

const mapStateToProps = (state: IStoreState) => ({
  userName: selectUserName(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      handleInitAction
    },
    dispatch
  );

export const ConnectedRootContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer);

export default ConnectedRootContainer;
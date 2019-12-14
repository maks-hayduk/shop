import SignUpComponent from './SignUp';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import {
  IStoreState,
  handleSignupAction
} from 'store';

const mapStateToProps = (state: IStoreState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      handleSignupAction
    },
    dispatch
  );

export const SignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpComponent);

export default SignupContainer;
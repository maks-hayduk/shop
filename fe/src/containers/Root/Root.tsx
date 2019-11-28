import * as React from 'react';
import { Switch, Route } from 'react-router';

import { NavBarMenu } from 'components';
import { styled } from 'theme'
import { RouteConsts } from 'consts';

import LoginContainer from '../Login';
import SignUpContainer from '../SignUp';
import { HandleInitAction } from 'store';

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
`;

interface IRoot {
  userName: string;
  handleInitAction: HandleInitAction;
}

const Root: React.FC<IRoot> = ({ userName, handleInitAction }) => {

  React.useEffect(() => {
    handleInitAction();
  }, []);

  return (
    <Wrapper>
      <NavBarMenu userName={userName}/>
      <Switch>
        <Route
          exact={true}
          path={RouteConsts.Login}
          component={LoginContainer}
        />
        <Route
          exact={true}
          path={RouteConsts.SignUp}
          component={SignUpContainer}
        />
        <Route
          exact={true}
          path={'/'}
          render={() => <div>hi</div>}
        />
      </Switch>
    </Wrapper>
  );
};

export default Root;

import * as React from 'react';
import { Switch, Route } from 'react-router';

import { NavBarMenu } from 'components';
import { styled } from 'theme'
import { RouteConsts } from 'consts';

import LoginContainer from '../Login';
import SignUpContainer from '../SignUp';
import DashboardContainer from '../Dashboard';
import OrdersContainer from '../Orders';
import { HandleInitAction, HandleLogOutAction } from 'store';

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
`;

interface IRoot {
  userName: string;
  handleInitAction: HandleInitAction;
  handleLogOutAction: HandleLogOutAction;
}

const Root: React.FC<IRoot> = ({ userName, handleInitAction, handleLogOutAction }) => {

  React.useEffect(() => {
    handleInitAction();
  }, []);

  return (
    <Wrapper>
      <NavBarMenu 
        userName={userName} 
        onLogOut={() => {
          handleLogOutAction();
        }}
      />
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
          path={RouteConsts.Dashboard}
          component={DashboardContainer}
        />
         <Route
          exact={true}
          path={RouteConsts.Order}
          component={OrdersContainer}
        />
      </Switch>
    </Wrapper>
  );
};

export default Root;

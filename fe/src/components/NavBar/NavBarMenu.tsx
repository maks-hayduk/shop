import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, NavLink } from 'react-router-dom';

import { H2, H3, Button, TextButton, InputField } from 'components';
import { styled } from 'theme';
import { RouteConsts } from 'consts';

const Wrapper = styled.div`
  width: 100%;
  height: 50px;

  box-shadow: 0px 1px 5px ${({ theme }) => theme.color.gray};

  position: sticky;
  top: 0;

  background-color: ${({ theme }) => theme.color.white};

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;

  .title {
    margin-right: 40px;
    text-decoration: none;
    color: ${({ theme }) => theme.color.black};
  }

  .left-side {
    width: 70%;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .right-side {
    width: 30%;
    margin-left: 20px;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    .user-name {
      margin-right: 15px;
    }

    .your-order {
      margin-left: 20px;
    }
  }

  .text-button {
    margin-right: 5px;
  }

  form {
    width: 100%;

    .form-field {
      padding: 0;
      width: 100% !important;
    }
  }
`;

interface INavBarMenu {
  userName: string;
  onLogOut: () => void;
}

export const NavBarMenu: React.FC<INavBarMenu> = ({ userName, onLogOut }) => {
  return (
    <Wrapper>
      <div className="left-side">
        <NavLink to="/">
          <H2 className="title">Shopify</H2>
        </NavLink>
          <Formik
            initialValues={{
              search: ''
            }}
            onSubmit={() => undefined}
          >{() => (
            <Form>
              <Field
                component={InputField}
                name="name"
                placeholder="Search..."
              />
            </Form>
          )}
          </Formik>
      </div>
      <div className="right-side">
        {userName && <H3 className="user-name">{userName}</H3>}
        {!userName ? (
          <>
            <NavLink to={RouteConsts.Login}>
              <TextButton className="text-button">Log in</TextButton>
            </NavLink>
            <NavLink to={RouteConsts.SignUp}>
              <Button>Sign up</Button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to={RouteConsts.Dashboard}>
              <Button onClick={onLogOut}>Log out</Button>
            </NavLink>
            <NavLink to={RouteConsts.Order}>
              <Button className="your-order">Your order</Button>
            </NavLink>
          </>
        )}
      </div>
    </Wrapper>
  );
};

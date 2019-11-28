import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, NavLink } from 'react-router-dom';

import { H2, Button, TextButton, InputField } from 'components';
import { styled } from 'theme';
import { RouteConsts } from 'consts';
import { H4 } from 'components/Text';

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
}

export const NavBarMenu: React.FC<INavBarMenu> = ({ userName }) => {
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
        {userName && <H4>{userName}</H4>}
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
          <NavLink to={'/'}>
            <Button>Log out</Button>
          </NavLink>
        )}
      </div>
    </Wrapper>
  );
};

import * as React from 'react';
import { Formik, Form, Field } from 'formik';

import { InputField, Button, H2 } from 'components';
import { styled } from 'theme';
import { validationUtil } from 'utils';
import { HandleSignupAction } from 'store';

const Wrapper = styled.div`
  max-width: 450px;
  margin: 0 auto;
  text-align: center;
  padding: 0 40px;
  margin-top: 100px;

  .title {
    margin-bottom: 20px;
  }

  .form-field {
    margin-bottom: 10px;
    text-align: left;
  }

  .submit-button {
    margin: 10px auto;
    width: 100%;
  }
`;

interface ISignupForm {
  handleSignupAction: HandleSignupAction;
}

const SignUpForm: React.FC<ISignupForm> = ({ handleSignupAction }) => {
  return (
    <Wrapper>
      <H2 className="title">Sign up to Shopify</H2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: ''
        }}
        onSubmit={(values) => {
          const { name, email, password } = values;
          handleSignupAction(name, email, password);
        }}
      >{({ isValid }) => (
        <Form>
          <Field
            component={InputField}
            label="Name"
            name="name"
            placeholder="Enter your name"
            validate={validationUtil.required}
          />
          <Field
            component={InputField}
            label="Email"
            name="email"
            placeholder="Enter your email"
            validate={validationUtil.required}
          />
          <Field
            component={InputField}
            label="Password"
            name="password"
            placeholder="Enter your password"
            validate={validationUtil.required}
            type="password"
          />
          <Button className="submit-button" type="submit">Sign up</Button>
        </Form>
      )}
      </Formik>
    </Wrapper>
  )
};

export default SignUpForm;

import * as React from 'react';
import { Formik, Form, Field } from 'formik';

import { InputField, Button, H2, TextButton } from 'components';
import { styled } from 'theme';
import { validationUtil } from 'utils';
import { AddItemAction } from 'store';

const Wrapper = styled.div`
  width: 300px;
  margin: 0 auto;
  text-align: center;

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
  addItemAction: AddItemAction;
  setIsOpen: (val: boolean) => void;
  getNewItems: () => void;
}

export const AddItemModal: React.FC<ISignupForm> = ({ addItemAction, setIsOpen, getNewItems }) => {
  return (
    <Wrapper>
      <H2 className="title">Add item</H2>
      <Formik
        initialValues={{
          name: '',
          description: '',
          price: 0,
          stock: 0
        }}
        onSubmit={async (values) => {
          await addItemAction(values);
          await getNewItems();
          setIsOpen(false);
        }}
      >{({ isValid }) => (
        <Form>
          <Field
            component={InputField}
            label="Name"
            name="name"
            placeholder="Enter item name"
            validate={validationUtil.required}
          />
          <Field
            component={InputField}
            label="Description"
            name="description"
            placeholder="Enter item description"
            validate={validationUtil.required}
          />
          <Field
            component={InputField}
            label="Price"
            name="price"
            placeholder="Enter item price"
            validate={validationUtil.required}
          />
          <Field
            component={InputField}
            label="Stock"
            name="stock"
            placeholder="Enter item stock count"
            validate={validationUtil.required}
          />
          <Button className="submit-button" type="submit">Add item</Button>
          <TextButton className="submit-button" onClick={() => setIsOpen(false)}>Cancel</TextButton>
        </Form>
      )}
      </Formik>
    </Wrapper>
  )
};

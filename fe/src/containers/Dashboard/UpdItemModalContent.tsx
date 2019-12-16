import * as React from 'react';
import { Formik, Form, Field } from 'formik';

import { InputField, Button, H2, TextButton } from 'components';
import { styled } from 'theme';
import { validationUtil } from 'utils';
import { UpdateItemAction, IItem } from 'store';

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

  .align-buttons {
    display: flex;

    .submit-button {
      margin: 10px;
      width: 100%;
    }
  }
`;

interface IUpdateItemModal {
  updateItemAction: UpdateItemAction;
  setIsOpen: (val: boolean) => void;
  itemId: number;
  itemInfo: IItem | undefined;
}

export const UpdateItemModal: React.FC<IUpdateItemModal> = ({ updateItemAction, setIsOpen, itemId, itemInfo }) => {
  
  return (
    <Wrapper>
      <H2 className="title">Update item</H2>
      <Formik
        initialValues={itemInfo || {
          name: '',
          description: '',
          price: 0,
          stock: 0
        }}
        enableReinitialize={true}
        onSubmit={async (values) => {
          await updateItemAction(itemId, {id: itemId, ...values});
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
          <div className="align-buttons">
            <Button className="submit-button" type="submit">Update item</Button>
            <TextButton className="submit-button" onClick={() => setIsOpen(false)}>Cancel</TextButton>
          </div>
        </Form>
      )}
      </Formik>
    </Wrapper>
  )
};

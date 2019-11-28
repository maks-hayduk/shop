import { ErrorMessage, FieldProps, FormikActions, FormikHandlers, getIn } from 'formik';
import * as React from 'react';

import { styled } from 'theme';

import { Label } from '../Text';

export interface IFormFieldProps {
  label?: string;
  hint?: string;
  disabled?: boolean;
}

export interface IFormComponent<Values = any, Value = any> {
  className?: string;
  invalid?: boolean;
  name: string;
  setFieldValue: FormikActions<Values>['setFieldValue'];
  setTouched: FormikActions<Values>['setTouched'];
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  value: Value;
  disabled?: boolean;
  onFocus?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
}

interface IWrapperProps {
  hasLabel: boolean;
  disabled: boolean;
  invalid: boolean;
  isFocused: boolean;
}

const Wrapper = styled.div<IWrapperProps>`
  width: 100%;
  padding-top: 20px;

  ${({ disabled, invalid, isFocused, hasLabel, theme }) =>
    hasLabel &&
    ` 
      position: relative;

      .label {
        position: absolute;
        top: 0;
        left: 0;
        color: ${invalid ? theme.color.red : isFocused ? theme.color.primary : theme.color.gray};
        ${disabled && 'opacity: 0.5;'}
      }

      ${!disabled &&
        !invalid &&
        !isFocused &&
        `
        .field-component:hover ~ .label {
          color: ${theme.color.black};
        }
      `}

      .field-component:focus ~ .label {
        color: ${theme.color.primary};
      }
    `}

  .error {
    color: ${({ theme }) => theme.color.red};
  }

  .hint {
    color: ${({ theme }) => theme.color.gray};
    ${({ disabled }) => disabled && 'opacity: 0.5;'}
  }
`;

const withFormField = <OriginalProps extends {}>(Component: React.ComponentType<IFormComponent | OriginalProps>) => ({
  field,
  form,
  label,
  hint,
  ...props
}: IFormFieldProps & FieldProps) => {
  const [isFocused, setFocus] = React.useState(false); // Solution for focusing Label on Select focus event
  const invalid = getIn(form.errors, field.name) && getIn(form.touched, field.name);

  return (
    <Wrapper
      className="form-field"
      hasLabel={label !== undefined}
      disabled={props.disabled === true}
      invalid={invalid}
      isFocused={isFocused}
    >
      <Component
        invalid={invalid}
        onFocus={() => {
          setFocus(true)
        }}
        onMouseLeave={() => {
          setFocus(false)
        }}
        setFieldValue={form.setFieldValue}
        setTouched={form.setTouched}
        {...field}
        {...props}
      />
      {label && <Label className="label media-lable">{label}</Label>}
      {!invalid && hint && <Label className="hint">{hint}</Label>}
      <ErrorMessage name={field.name}>
        {msg => typeof msg !== 'object' && <Label className="error">{msg}</Label>}
      </ErrorMessage>
    </Wrapper>
  );
};

export default withFormField;

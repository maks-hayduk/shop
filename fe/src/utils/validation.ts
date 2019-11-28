type IValidator = (val: any, allVals?: any) => string | undefined;

export const isRequired = (value: any) => (value !== undefined && value !== null && value !== '' ? true : false);

export const required: IValidator = (value: any) =>
  isRequired(value) ? undefined : 'Field is required';
  
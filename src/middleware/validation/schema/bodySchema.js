import Joi from '@hapi/joi';

const name = Joi.string()
  .regex(/^\D+$/)
  .required();

const string = Joi.string().required();
const number = Joi.number().min(0).required();
const date = Joi.date().required();

const email = Joi.string()
  .email()
  .lowercase()
  .required();

const password = Joi.string()
  .min(7)
  .required()
  .strict();

const reset = Joi.object({
  password,
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .strict()
    .error(new Error('Your password and confirm password do not match')),
});

const createStaffSchema = Joi.object({
  first_name: name,
  last_name: name,
  email,
  staff_id: string,
  admin: Joi.boolean().required(),
});

const loginUserSchema = Joi.object({
  email,
  password,
});
const requestReset = Joi.object({
  email,
});

// const createAccountSchema = Joi.object({
//   type: Joi.string()
//     .lowercase()
//     .valid('savings', 'current')
//     .required(),
//   balance: Joi.number()
//     .positive()
//     .allow(0)
//     .precision(2)
//     .default(0.0),
// });

const addRoutine = Joi.object({
  vendor_type: string,
  country: string,
  vendor_name: string,
  vendor_email: email,
  vendor_phone_number: number,
  yom: date,
  batch_id: string,
  batch_qty: number,
  state: string,
  meter_model: string,
  meter_class: string,
  meter_type: string,
  meter_number: number,
  date_of_routine_test: date,
  tariff_charges: string,
});
const addType = Joi.object({
  vendor_name: string,
  country: string,
  meter_type: string,
  meter_number: number,
  meter_make: string,
  meter_rating: string,
  meter_class: string,
  state: string,
  date_certified: date,
  vendor_email: email,
  vendor_phone_number: string,
});
const addRecert = Joi.object({
  disco: string,
  state: string,
  business_unit_name: string,
  customer_name: string,
  customer_address: string,
  customer_phone_number: string,
  customer_email: email,
  yom: date,
  country: string,
  tariff_class_name: string,
  meter_type: string,
  meter_class: string,
  meter_number: number,
  meter_model: string,
  date_of_routine_test: date,
  date_of_last_recert: date,
  tariff_charges: string,
  test_measurement_error: string,
});

export default {
  '/addUser': createStaffSchema,
  '/reset': reset,
  '/requestReset': requestReset,
  '/login': loginUserSchema,
  '/addType': addType,
  '/addRoutine': addRoutine,
  '/addRecert': addRecert,
};

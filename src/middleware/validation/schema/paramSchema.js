import Joi from 'joi';

const id = Joi.string()
  .regex(/^\d+$/)
  .required();

const meterNumberSchema = Joi.object({
  meterNumber: id.error(
    new Error('Meter number must be an integer'),
  ),
});

const IDSchema = Joi.object({
  id: id.error(
    new Error('ID must be an integer'),
  ),
});

export default {
  '/:meterNumber': meterNumberSchema,
  '/:id': IDSchema,
};

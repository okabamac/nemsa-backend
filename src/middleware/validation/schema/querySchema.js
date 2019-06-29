import Joi from 'joi';

const string = Joi.string().required();

const date = Joi.string().required();

const byStateSchema = Joi.object({
  state: string.error(new Error('State must be a string')),
  test: string.error(new Error('Test must be a string')),
});

const byDateSchema = Joi.object({
  from: date.error(new Error('From must be a date')),
  to: date.error(new Error('To must be a date')),
  test: string.error(new Error('Test must be a string')),
});


const byBatchSchema = Joi.object({
  batch_id: string.error(new Error('Batch must be a string')),
});

export default {
  '/byState': byStateSchema,
  '/byDate': byDateSchema,
  '/byBatch': byBatchSchema,
};

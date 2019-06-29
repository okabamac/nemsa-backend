import Joi from 'joi';
import Schemas from './schema/querySchema';

const queryValidation = (req, res, next) => {
  // enabled HTTP methods for request data validation
  const supportedMethods = ['get'];

  // Joi validation options
  const validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };
  // return the validation middleware
  const route = req.route.path;
  const method = req.method.toLowerCase();
  if (supportedMethods.includes(method) && route in Schemas) {
    // get schema for the current route
    const schema = Schemas[route];
    if (schema) {
      // Validate req.body using the schema and validation options
      return Joi.validate(
        req.query,
        schema,
        validationOptions,
        (err, data) => {
          if (err) {
            // Custom Error
            const SimplifiedError = {
              status: 400,
              error: err.details
                ? err.details[0].message
                  .replace(/['"]/g, '')
                : err.message,
            };

            // Send back the JSON error response
            return res.status(400).json(SimplifiedError);
          }
          // Replace req.body with the data after Joi validation
          return next();
        },
      );
    }
  }
  return next();
};

export default queryValidation;

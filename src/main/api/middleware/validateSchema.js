import { StatusCodes } from 'http-status-codes';

class ValidationException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.status = StatusCodes.BAD_REQUEST;
  }
}

const validateSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    const err = new ValidationException(`Validation failed: ${errorMessage}`);
    return next(err);
  }

  next();
};

export default validateSchema;
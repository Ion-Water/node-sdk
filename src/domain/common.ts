import Joi from "joi";

export function isValidSchema<T>(schema: Joi.ObjectSchema) {
  return function (input: unknown): input is T {
    const result = schema.validate(input);
    return !!result.error;
  };
}

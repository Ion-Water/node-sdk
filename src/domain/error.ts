import Joi from "joi";
import { isValidSchema } from "./common";

export interface ErrorMessage {
  type: "error";
  data: HttpError;
}

interface HttpErrorData {
  code: string;
  message: string;
}

export abstract class HttpError extends Error {
  abstract statusCode: number;
  abstract errorCode: string;
  get data(): HttpErrorData {
    return {
      code: this.errorCode,
      message: this.message,
    };
  }
}

export class BadRequestError extends HttpError {
  statusCode = 400;
  errorCode = "bad_request";

  constructor(message: string) {
    super(message);
  }
}

export class BadAuthorizationError extends HttpError {
  statusCode = 401;
  errorCode = "bad_authorization";

  constructor(message: string) {
    super(message);
  }
}

export class InternalServerError extends HttpError {
  statusCode = 500;
  errorCode = "server";

  constructor(message: string) {
    super(message);
  }
}

export const HttpErrorSchema = Joi.object({
  code: Joi.string().required(),
  message: Joi.string().required(),
}).unknown();

export const ErrorMessageSchema = Joi.object({
  type: Joi.string().allow("error").required(),
  data: HttpErrorSchema,
}).required();

export const isErrorMessage = isValidSchema<ErrorMessage>(ErrorMessageSchema);
export const isHttpError = isValidSchema<HttpError>(HttpErrorSchema);

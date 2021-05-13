import Joi from "joi";
import { isValidSchema } from "./common";

export interface RegisterUserMessage {
  type: "register_user";
  register_user: {
    method: "basic_auth";
    user: {
      username: string;
      password: string;
    };
  };
}

type AuthorizationMessageData = RegisterUserMessage;

export interface AuthorizationMessage {
  type: "authorization";
  data: AuthorizationMessageData;
}

export const AuthorizationMessageSchema = Joi.object({
  type: Joi.string().allow("authorization").required(),
  data: Joi.object().required(),
}).required();

export const RegisterUserMessageSchema = Joi.object({
  type: Joi.string().allow("register_user").required(),
  register_user: Joi.object({
    user: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }).required(),
  }).required(),
}).required();

export const isAuthorizationMessage = isValidSchema<AuthorizationMessage>(
  AuthorizationMessageSchema
);
export const isRegisterUserMessage = isValidSchema<RegisterUserMessage>(
  RegisterUserMessageSchema
);

export function newAuthorizationMessage(
  data: AuthorizationMessageData
): AuthorizationMessage {
  return {
    type: "authorization",
    data,
  };
}

export function newRegisterUserMessage(
  username: string,
  password: string
): AuthorizationMessage {
  return newAuthorizationMessage({
    type: "register_user",
    register_user: {
      method: "basic_auth",
      user: {
        username,
        password,
      },
    },
  });
}
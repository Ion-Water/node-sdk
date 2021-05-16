import Joi from "joi";
import { isValidSchema } from "./common";
import { AnySuccessData } from "./success";

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

export interface LoginUserMessage {
  type: "login";
  login: {
    method: "basic_auth";
    user: {
      username: string;
      password: string;
    };
  };
}

export interface LoginUserSuccess extends AnySuccessData {
  username: string;
  access_token: string;
  refresh_token: string;
  expiry: number;
}

type AuthorizationMessageData = RegisterUserMessage | LoginUserMessage;

export interface AuthorizationMessage<
  T extends AuthorizationMessageData = AuthorizationMessageData
> {
  type: "authorization";
  data: T;
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

export const LoginUserMessageSchema = Joi.object({
  type: Joi.string().allow("login").required(),
  login: Joi.object({
    user: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }).required(),
  }).required(),
}).required();

export const isAuthorizationMessage = isValidSchema<
  AuthorizationMessage<AuthorizationMessageData>
>(AuthorizationMessageSchema);

export const isRegisterUserMessage = isValidSchema<RegisterUserMessage>(
  RegisterUserMessageSchema
);

export const isLoginUserMessage = isValidSchema<LoginUserMessage>(
  LoginUserMessageSchema
);

export function newAuthorizationMessage<
  T extends AuthorizationMessageData = AuthorizationMessageData
>(data: T): AuthorizationMessage<T> {
  return {
    type: "authorization",
    data,
  };
}

export function newRegisterUserMessage(
  username: string,
  password: string
): AuthorizationMessage<RegisterUserMessage> {
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

export function newLoginUserMessage(
  username: string,
  password: string
): AuthorizationMessage<LoginUserMessage> {
  return newAuthorizationMessage({
    type: "login",
    login: {
      method: "basic_auth",
      user: {
        username,
        password,
      },
    },
  });
}

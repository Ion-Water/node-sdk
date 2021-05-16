import Joi from 'joi';
import { isValidSchema } from './common';
import { AnySuccessData } from './success';

export interface RegisterUserMessageBody {
  type: 'register_user';
  register_user: {
    user: {
      username: string;
      password: string;
    };
  };
}

export interface LoginUserMessageBody {
  type: 'login';
  login: {
    method: 'basic_auth';
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

type AuthorizationMessageBody = RegisterUserMessageBody | LoginUserMessageBody;

export interface AuthorizationMessage<
  T extends AuthorizationMessageBody = AuthorizationMessageBody
> {
  type: 'authorization';
  data: T;
}

export const AuthorizationMessageSchema = Joi.object({
  type: Joi.string().allow('authorization').required(),
  data: Joi.object().required(),
}).required();

export const RegisterUserMessageBodySchema = Joi.object({
  type: Joi.string().allow('register_user').required(),
  register_user: Joi.object({
    user: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }).required(),
  }).required(),
}).required();

export const RegisterUserMessageSchema = Joi.object({
  type: Joi.string().allow('authorization').required(),
  data: RegisterUserMessageBodySchema,
}).required();

export const LoginUserMessageBodySchema = Joi.object({
  type: Joi.string().allow('login').required(),
  login: Joi.object({
    user: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }).required(),
  }).required(),
}).required();

export const LoginUserMessageSchema = Joi.object({
  type: Joi.string().allow('authorization').required(),
  data: LoginUserMessageBodySchema,
}).required();

export const isAuthorizationMessage = isValidSchema<AuthorizationMessage<AuthorizationMessageBody>>(
  AuthorizationMessageSchema
);

export const isRegisterUserMessageBody = isValidSchema<RegisterUserMessageBody>(
  RegisterUserMessageBodySchema
);

export const isLoginUserMessageBody = isValidSchema<LoginUserMessageBody>(
  LoginUserMessageBodySchema
);

export const isLoginUserMessage =
  isValidSchema<AuthorizationMessage<LoginUserMessageBody>>(LoginUserMessageSchema);

export const isRegisterUserMessage =
  isValidSchema<AuthorizationMessage<RegisterUserMessageBody>>(LoginUserMessageSchema);

export function newAuthorizationMessage<
  T extends AuthorizationMessageBody = AuthorizationMessageBody
>(data: T): AuthorizationMessage<T> {
  return {
    type: 'authorization',
    data,
  };
}

export function newRegisterUserMessage(
  username: string,
  password: string
): AuthorizationMessage<RegisterUserMessageBody> {
  return newAuthorizationMessage({
    type: 'register_user',
    register_user: {
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
): AuthorizationMessage<LoginUserMessageBody> {
  return newAuthorizationMessage({
    type: 'login',
    login: {
      method: 'basic_auth',
      user: {
        username,
        password,
      },
    },
  });
}

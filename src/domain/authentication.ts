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

type Authentication = RegisterUserMessageBody | LoginUserMessageBody;

export const AuthenticationMessageTypeName = 'authentication';

export type AuthenticationMessageType = typeof AuthenticationMessageTypeName;

export interface AuthenticationMessage<T extends Authentication = Authentication> {
  type: AuthenticationMessageType;
  data: T;
}

export const AuthorizationMessageSchema = Joi.object({
  type: Joi.string().allow(AuthenticationMessageTypeName).required(),
  data: Joi.object().required(),
}).required();

export const RegisterUserMessageBodySchema = Joi.object({
  type: Joi.string().allow('register_user').required(),
  register_user: Joi.object({
    user: Joi.object({
      username: Joi.string()
        .required()
        .min(2)
        .pattern(/[a-zA-Z0-9-_]/),
      password: Joi.string().required().min(12),
    }).required(),
  }).required(),
}).required();

export const RegisterUserMessageSchema = Joi.object({
  type: Joi.string().allow(AuthenticationMessageTypeName).required(),
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
  type: Joi.string().allow(AuthenticationMessageTypeName).required(),
  data: LoginUserMessageBodySchema,
}).required();

export const isAuthorizationMessage = isValidSchema<AuthenticationMessage<Authentication>>(
  AuthorizationMessageSchema
);

export const isRegisterUserMessageBody = isValidSchema<RegisterUserMessageBody>(
  RegisterUserMessageBodySchema
);

export const isLoginUserMessageBody = isValidSchema<LoginUserMessageBody>(
  LoginUserMessageBodySchema
);

export const isLoginUserMessage =
  isValidSchema<AuthenticationMessage<LoginUserMessageBody>>(LoginUserMessageSchema);

export const isRegisterUserMessage =
  isValidSchema<AuthenticationMessage<RegisterUserMessageBody>>(LoginUserMessageSchema);

export function newAuthorizationMessage<T extends Authentication = Authentication>(
  data: T
): AuthenticationMessage<T> {
  return {
    type: AuthenticationMessageTypeName,
    data,
  };
}

export function newRegisterUserMessage(
  username: string,
  password: string
): AuthenticationMessage<RegisterUserMessageBody> {
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
): AuthenticationMessage<LoginUserMessageBody> {
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

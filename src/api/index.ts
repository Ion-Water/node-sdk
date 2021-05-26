import { LoginUserSuccess } from '../domain';
import { SuccessMessage, AnySuccessData } from '../domain/success';
import { loginUser, LoginUserRequest, registerUser, RegisterUserRequest } from './authorization';

export interface APIClientOptions {
  hostname: string;
}

export class APIClient {
  private options: APIClientOptions;
  constructor(options: APIClientOptions) {
    this.options = options;
  }

  static async registerUser(
    hostname: string,
    request: RegisterUserRequest
  ): Promise<SuccessMessage<AnySuccessData>> {
    return registerUser(hostname, request);
  }

  static async loginUser(
    hostname: string,
    request: LoginUserRequest
  ): Promise<SuccessMessage<LoginUserSuccess>> {
    return loginUser(hostname, request);
  }

  async registerUser(request: RegisterUserRequest): Promise<SuccessMessage<AnySuccessData>> {
    return APIClient.registerUser(this.options.hostname, request);
  }

  async loginUser(request: LoginUserRequest): Promise<SuccessMessage<LoginUserSuccess>> {
    return APIClient.loginUser(this.options.hostname, request);
  }
}

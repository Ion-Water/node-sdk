import { registerUser, RegisterUserRequest } from "./authorization";

interface APIClientOptions {
  hostname: string;
}

export class APIClient {
  private options: APIClientOptions;
  constructor(options: APIClientOptions) {
    this.options = options;
  }

  static async registerUser(hostname: string, request: RegisterUserRequest) {
    return registerUser(hostname, request);
  }

  async registerUser(request: RegisterUserRequest) {
    return APIClient.registerUser(this.options.hostname, request);
  }
}

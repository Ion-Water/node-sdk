import { SuccessMessage } from "../domain/success";
import axios from "axios";
import {
  LoginUserSuccess,
  newLoginUserMessage,
  newRegisterUserMessage,
} from "../domain";

export interface RegisterUserRequest {
  username: string;
  password: string;
}

export interface LoginUserRequest {
  username: string;
  password: string;
}

export async function registerUser(
  hostname: string,
  request: RegisterUserRequest
): Promise<SuccessMessage> {
  const result = await axios.post<SuccessMessage>(
    `${hostname}/register/user`,
    newRegisterUserMessage(request.username, request.password)
  );
  return result.data;
}

export async function loginUser(
  hostname: string,
  request: LoginUserRequest
): Promise<SuccessMessage<LoginUserSuccess>> {
  const result = await axios.post<SuccessMessage<LoginUserSuccess>>(
    `${hostname}/login/user`,
    newLoginUserMessage(request.username, request.password)
  );
  return result.data;
}

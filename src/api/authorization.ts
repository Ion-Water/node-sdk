import { SuccessMessage } from "../domain/success";
import axios from "axios";
import { newRegisterUserMessage } from "../domain";

export interface RegisterUserRequest {
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

import Joi from "joi";
import { isValidSchema } from "./common";

export interface AnySuccessData extends Record<string, unknown> {
  message: string;
}

export interface SuccessMessage<T = AnySuccessData> {
  type: "success";
  data: T;
}

export const SuccessMessageSchema = Joi.object({
  type: "success",
  data: Joi.object({
    message: Joi.string().required(),
  })
    .unknown()
    .required(),
}).required();

export const isSuccessMessage =
  isValidSchema<SuccessMessage>(SuccessMessageSchema);

export function newSuccessMessage(data: AnySuccessData): SuccessMessage {
  return {
    type: "success",
    data,
  };
}

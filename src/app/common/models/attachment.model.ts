import { BaseModel } from "./base.model";

export interface Attachment extends BaseModel {
  name?: string;
  size?: number;
  path?: string;
  error?: string;
}
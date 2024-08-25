import { Gender } from "@/entities/gender";
import { TeeSize } from "@/entities/tee-size";

export interface User {
  id?: string;
  address?: string;
  phone_number?: string;
  tee_size?: TeeSize;
  email?: string;
  gender?: Gender;
  user_id?: string;
}

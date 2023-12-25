import axios from "@/axios/axios";
import { UserLogin } from "@/types/userType";

const loginApi = async (data: UserLogin) => {
  const res = await axios.post("/user/login", data);
  return res;
};
export { loginApi };

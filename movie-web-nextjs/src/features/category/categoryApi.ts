import axios from "@/axios/axios";

const getAllCategory = async () => {
  return await axios.get("/category");
};

export { getAllCategory };

import axios from "@/axios/axios";

const getAllCountry = async () => {
  return await axios.get("/country");
};

export { getAllCountry };

import axios from "@/axios/axios";
import { CountryType } from "@/types/countryType";

const getAllCountry = async () => {
  return await axios.get("/country");
};
const createCountry = async (data: CountryType) => {
  return await axios.post("/country/create", data);
};
const patchCountry = async (data: CountryType) => {
  return await axios.patch(`/country/${data.id}`, data);
};
const deleteCountry = async (data: CountryType) => {
  return await axios.delete(`/country/${data.id}`);
};
export { getAllCountry, createCountry, patchCountry, deleteCountry };

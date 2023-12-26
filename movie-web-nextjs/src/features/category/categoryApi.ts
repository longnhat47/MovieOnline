import axios from "@/axios/axios";
import { CategoryType } from "@/types/categoryType";

const getAllCategory = async () => {
  return await axios.get("/category");
};
const createCategory = async (data: CategoryType) => {
  return await axios.post("/category/create", data);
};
const patchCategory = async (data: CategoryType) => {
  return await axios.patch(`/category/${data.id}`, data);
};
const deleteCategory = async (data: CategoryType) => {
  return await axios.delete(`/category/${data.id}`);
};
export { getAllCategory, createCategory, patchCategory, deleteCategory };

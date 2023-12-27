import axios from "@/axios/axios";
import { MovieType } from "@/types/movieTypes";

const fetchAllMovie = async () => {
  const res = await axios.get("/movie");
  return res;
};
const fetchMovieDetail = async (slug: string) => {
  const res = await axios.get(`/movie/detail/${slug}`);
  return res;
};
const createMovie = async (data: MovieType) => {
  return await axios.post("/movie/create", data);
};
const patchMovie = async (data: MovieType) => {
  return await axios.patch(`/movie/${data.id}`, data);
};
const deleteMovie = async (data: MovieType) => {
  return await axios.delete(`/movie/${data.id}`);
};
export {
  fetchAllMovie,
  fetchMovieDetail,
  createMovie,
  patchMovie,
  deleteMovie,
};

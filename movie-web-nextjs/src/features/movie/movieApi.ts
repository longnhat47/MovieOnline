import axios from "@/axios/axios";
import { MovieCreateType, MovieType } from "@/types/movieTypes";

const fetchAllMovie = async () => {
  const res = await axios.get("/movie");
  return res;
};
const fetchMovieDetail = async (slug: string) => {
  const res = await axios.get(`/movie/detail/${slug}`);
  return res;
};
const createMovie = async (data: MovieCreateType) => {
  const form = new FormData();
  for (const [key, value] of Object.entries(data)) {
    form.append(`${key}`, value);
  }
  return await axios.post("/movie/create", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const patchMovie = async (data: MovieCreateType) => {
  const form = new FormData();
  for (const [key, value] of Object.entries(data)) {
    form.append(`${key}`, value);
  }
  return await axios.patch(`/movie/${data.id}`, form);
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

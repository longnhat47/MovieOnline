import axios from "@/axios/axios";

const fetchAllMovie = async () => {
  const res = await axios.get("/movie");
  return res;
};
const fetchMovieDetail = async (slug: string) => {
  const res = await axios.get(`/movie/detail/${slug}`);
  return res;
};
export { fetchAllMovie, fetchMovieDetail };

import { CategoryType } from "@/types/categoryType";
import { CountryType } from "@/types/countryType";
import { CommentType } from "@/types/commentType";

type MovieType = {
  id?: string;
  category?: string;
  country?: string;
  name?: string;
  slug?: string;
  thumbnail?: string;
  views?: number;
  created_at?: Date;
  status?: boolean;
};
type MovieDetailType = {
  id?: string;
  category?: CategoryType[];
  country?: CountryType[];
  name?: string;
  thumbnail?: string;
  description?: string;
  video?: string;
  comment?: CommentType[];
  views?: number;
  created_at?: Date;
  status?: boolean;
};
type MovieCreateType = {
  id?: string;
  name?: string;
  description?: string;
  category?: string;
  country?: string;
  thumbnail?: File;
  video?: File;
};

export type { MovieType, MovieDetailType, MovieCreateType };

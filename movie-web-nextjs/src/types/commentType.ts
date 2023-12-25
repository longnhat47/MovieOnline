import { userCommentType } from "./userType";

type CommentType = {
  id: string;
  movie: string;
  user: userCommentType;
  content: string;
  created_at: Date;
};

export type { CommentType };

export type Response<T = unknown> = {
  success: boolean;

  skip?: number;
  limit?: number;
  total?: number;
  data: T;
};

export type Company = {
  id?: string;
  _id?: string;
  name?: string;
  connections?: Connection[];
  __v?: number;
};

export type Connection = {
  reference: string;
  type: "GROUP" | "CLIENT" | "MC";
};

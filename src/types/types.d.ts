export type Response<T = unknown> = {
  success: boolean;
  data: {
    skip: number;
    limit: number;
    total: number;
    data: T;
  };
};

export type Connection = {
  reference: string;
  type: "CLIENT" | "SUPPLIER";
};

export type Company = {
  id: string;
  _id?: string;
  name?: string;
  brand?: Brand;
  clients?: Client[];
  msNumbers?: MSNumber[];
  brands?: Brand[];
  groups?: Group[];
  connections?: Connection[];
  __v?: number;
};

export type Client = {
  id?: string;
  name: string;
};

export type MSNumber = {
  id?: string;
  name: string;
};

export type Group = {
  id?: string;
  name: string;
};

export type Brand = {
  id?: string;
  name: string;
};

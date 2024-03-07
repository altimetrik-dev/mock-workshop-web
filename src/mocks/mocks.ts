import {
  Response,
  Company,
  Client,
  MSNumber,
  Group,
  Brand,
} from "../types/types";

export const clients = [
  {
    id: "65e8e99d8dd7f19d9cf07bd9",
    name: "MCD",
  },
  {
    id: "65e8e99d8dd7f19d9cf07bd3",
    name: "ABC",
  },
  {
    id: "65e8e99d8dd7f19d9cf07bd4",
    name: "DUO",
  },
  {
    id: "65e8e99d8dd7f19d9cf07bd5",
    name: "XYZ",
  },
  {
    id: "65e8e99d8dd7f19d9cf07bd6",
    name: "PQR",
  },
  {
    id: "65e8e99d8dd7f19d9cf07bd7",
    name: "LMN",
  },
] satisfies Client[];

export const msNumbers = [
  {
    id: "65e8e99d8dd7f19d9cf07bd9",
    name: "MC1234",
  },
  {
    id: "65e8e99d8dd7f19d9cf07bd3",
    name: "MC456",
  },
  {
    id: "65e8e99d8dd7f19d9cf07bd4",
    name: "MC789",
  },
] satisfies MSNumber[];

export const groups = [
  {
    id: "6e99d8dd7f19d9cf07bd9",
    name: "HTC",
  },
  {
    id: "65e8e99d8dd7f9cf07bd3",
    name: "BMW",
  },
  {
    id: "6e8e99d8dd7f19d9cf07bd4",
    name: "CON",
  },
] satisfies Group[];

export const brands = [
  {
    id: "65e8e9f19d9cf07bd9",
    name: "NOK",
  },
  {
    id: "65e8e99d8dd7f19d93",
    name: "APPL",
  },
  {
    id: "65e8e99d8dd7f19d",
    name: "NFLX",
  },
] satisfies Brand[];

export const companies = {
  success: true,
  data: {
    skip: 1,
    limit: 1,
    total: 3,
    data: {
      id: "65e8e99d8dd7f19d9cf07bd9",
      _id: "65e8e99d8dd7f19d9cf07bd9",
      name: "ACME Corporation",
      clients,
      msNumbers,
      groups,
      brands,
      connections: [
        {
          reference: "string",
          type: "CLIENT",
        },
      ],
      __v: 0,
    },
  },
} satisfies Response<Company>;

import { Response, Company } from "../types/types";

export const company = {
  success: true,
  data: {
    id: "65e9d3a158ce52ceea5ead13",
    _id: "65e9d3a158ce52ceea5ead13",
    name: "Acme Corp.",
    connections: [
      { reference: "CL001M", type: "CLIENT" },
      { reference: "CL002M", type: "CLIENT" },
      { reference: "CL003M", type: "CLIENT" },
      { reference: "CL004M", type: "CLIENT" },
      { reference: "CL005M", type: "CLIENT" },
      { reference: "G0001M", type: "GROUP" },
      { reference: "G0002M", type: "GROUP" },
      { reference: "G0003M", type: "GROUP" },
      { reference: "G0004M", type: "GROUP" },
      { reference: "G0005M", type: "GROUP" },
      { reference: "MC001M", type: "MC" },
      { reference: "MC002M", type: "MC" },
      { reference: "MC003M", type: "MC" },
      { reference: "MC004M", type: "MC" },
      { reference: "G0005M", type: "MC" },
    ],
    __v: 0,
  },
} satisfies Response<Company>;

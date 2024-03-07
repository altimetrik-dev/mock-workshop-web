import { HttpResponse, delay, http } from "msw";
import { company } from "./mocks";

export const handlers = [
  http.get("*/v1/company/:id", async () => {
    await delay();
    return HttpResponse.json(company);
  }),
  http.put("*/v1/company", async ({ request }) => {
    const data = await request.json();
    await delay();
    return HttpResponse.json(data);
  }),
];

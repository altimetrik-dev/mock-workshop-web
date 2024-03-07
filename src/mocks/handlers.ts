import { HttpResponse, delay, http } from "msw";
import { clients, companies } from "./mocks";

export const handlers = [
  http.get("*/v1/company/:id", async () => {
    await delay();
    return HttpResponse.json(companies);
  }),
  http.put("*/v1/company", async ({ request }) => {
    const data = await request.json();
    await delay();
    return HttpResponse.json(data);
  }),
  http.get("*/v1/client", async () => {
    await delay();
    return HttpResponse.json(clients);
  }),
];

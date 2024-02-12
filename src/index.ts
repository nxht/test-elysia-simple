import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";

const app = new Elysia({
  cookie: {
    secrets: "test",
    sign: ["test"],
  },
})
  .use(swagger())
  .get("/", () => "hi", {
    response: t.String({ description: "sample description" }),
  })
  .listen(3000);

console.log(
  `Swagger DOCs: http://${app.server?.hostname}:${app.server?.port}/swagger`
);

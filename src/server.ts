import fastify from "fastify";
import { Authentication } from "./routes/authentication";
import { Meals } from "./routes/meals";

const app = fastify();

app.register(Authentication, {
  prefix: "authentication",
});

app.register(Meals, {
  prefix: "meals",
});

app.listen({ port: 3556 }).then(() => {
  console.info("Server is running");
});

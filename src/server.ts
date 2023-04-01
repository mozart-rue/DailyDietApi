import fastify from "fastify";
import { Authentication } from "./routes/authentication";

const app = fastify();

app.register(Authentication, {
  prefix: "authentication",
});

app.listen({ port: 3556 }).then(() => {
  console.info("Server is running");
});

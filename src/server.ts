import fastify from "fastify";

const app = fastify();

app.listen({ port: 3556 }).then(() => {
  console.info("Server is running");
});

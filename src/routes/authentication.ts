import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function Authentication(app: FastifyInstance) {
  app.post("/signup", (req, res) => {
    const createNewAccountBodySchema = z.object({
      email: z.string(),
      name: z.string(),
      password: z.string(),
    });

    const { email, name, password } = createNewAccountBodySchema.parse(
      req.body
    );

    return res.status(201).send();
  });
}

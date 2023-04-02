import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { generateSalt, hashPassword } from "../lib/encrypter";

export async function Authentication(app: FastifyInstance) {
  app.post("/signup", async (req, res) => {
    const createNewAccountBodySchema = z.object({
      email: z.string(),
      name: z.string(),
      password: z.string(),
    });

    const { email, name, password } = createNewAccountBodySchema.parse(
      req.body
    );

    // Check if the e-mail already exists
    const userEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userEmail) {
      return res.status(400).send({
        error: "E-mail already registered",
      });
    }

    // Encrypt user password
    const salt = await generateSalt();
    const hashedPassword = await hashPassword(password, salt);

    await prisma.user.create({
      data: {
        name,
        email,
        password_salt: salt,
        password_hash: hashedPassword,
      },
    });

    return res.status(201).send();
  });
}

import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { hashPassword, verifyPassword } from "../lib/encrypter";

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
    const password_hash = await hashPassword(password);

    await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    });

    return res.status(201).send();
  });

  app.post("/signin", async (req, res) => {
    const signinBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    });

    const { email, password } = signinBodySchema.parse(req.body);

    // Check account credentials
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      console.log(`User not found`);
      return res.status(401).send();
    }

    // Check if password is correct
    const isPasswordValid = await verifyPassword(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).send();
    }

    return res.status(200).send({ userId: user.user_id });
  });
}

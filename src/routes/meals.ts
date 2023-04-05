import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function Meals(app: FastifyInstance) {
  app.post("/newMeal", async (req, res) => {
    const createNewMealBodySchema = z.object({
      name: z.string(),
      description: z.string().nullable(),
      dateTime: z.string(),
      inDiet: z.boolean(),
    });

    const userIdHeaderSchema = z.object({
      user_id: z.string(),
    });

    const { name, description, inDiet, dateTime } =
      createNewMealBodySchema.parse(req.body);

    const { user_id } = userIdHeaderSchema.parse(req.headers);

    if (!user_id) {
      return res.status(401).send();
    }

    const user = await prisma.user.findFirst({
      where: {
        user_id,
      },
    });

    if (!user) {
      return res.status(401).send();
    }

    await prisma.meals.create({
      data: {
        name,
        description,
        date_time: dateTime,
        in_diet: inDiet,
        user_id: user_id,
      },
    });

    return res.status(201).send();
  });
}

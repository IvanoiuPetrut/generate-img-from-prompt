import Joi from "joi";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const userSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const checkUserExists = async (name) => {
  const user = await prisma.user.findUnique({
    where: {
      name,
    },
  });
  return user;
};

export { userSchema, checkUserExists };

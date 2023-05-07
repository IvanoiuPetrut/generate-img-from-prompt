import Joi from "joi";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const userController = {};

userController.createUser = async (req, res) => {
  const { name, password } = req.body;

  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate({ name, password });
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const userExists = await prisma.user.findUnique({
    where: {
      name,
    },
  });
  if (userExists) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "User created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export default userController;

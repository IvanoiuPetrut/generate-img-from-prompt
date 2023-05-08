import * as dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { userSchema, checkUserExists } from "../validations/userValidations.js";

const prisma = new PrismaClient();
const userController = {};

userController.createUser = async (req, res) => {
  const { name, password } = req.body;

  const { error } = userSchema.validate({ name, password });
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const userExists = await checkUserExists(name);
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

userController.loginUser = async (req, res) => {
  const { name, password } = req.body;

  const { error } = userSchema.validate({ name, password });
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const user = await checkUserExists(name);
  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      name: user.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  const response = {
    token,
    userId: user.id,
  };

  res.status(200).json(response);
};

export default userController;

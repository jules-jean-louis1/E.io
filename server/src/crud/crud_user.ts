import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const createUser = async (data: any) => {
  console.log("📩: Received data:", data);

  if (!data.username || !data.email || !data.password) {
    return { error: "Please provide all required fields" };
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);
    const userExists = await prisma.user.findUnique({
      where: {
        email: data.email as string,
      },
    });

    if (userExists) {
      return { error: "User already exists" };
    }

    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hash,
      },
    });

    console.log("🚀: User created successfully", user);
    return user;
  } catch (error) {
    console.error("🔥: Error creating user", error);
    return { error: "Error creating user" };
  }
};

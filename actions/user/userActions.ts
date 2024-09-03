import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";
import { convertToSafeUser } from "@/app/utils/helperFunctions/convertToSafeUser";

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      throw new Error("No user session found");
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        orders: true,
        reviews: true,
      },
    });

    if (!currentUser) {
      throw new Error("User not found");
    }

    return convertToSafeUser(currentUser);
  } catch (err) {
    console.error(err);
    throw new Error("Error trying to get current user");
  }
}

export async function getUsers() {
  try {
    return await prisma.user.findMany();
  } catch (err) {
    console.error("error trying to fetch users", err);
    throw err;
  }
}

export async function isLoggedIn() {
  try {
    const session = await getServerSession(authOptions);
    return session?.user ? true : false;
  } catch (err) {
    console.error("error trying to check if user is logged in", err);
    throw new Error("Error trying to check if user is logged in");
  }
}

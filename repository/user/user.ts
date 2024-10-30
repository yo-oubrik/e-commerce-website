import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";
import { convertToSafeUser } from "@/app/utils/functions/users";
import { Role } from "@prisma/client";

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.info("No user session found");
      return null;
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
      console.info("User not found");
      return null;
    }

    return convertToSafeUser(currentUser);
  } catch (err) {
    console.error("Error trying to getCurrentUser", err);
    return null;
  }
}

export async function getAllUsers() {
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

export async function isUserAdmin() {
  const currentUser = await getCurrentUser();
  return currentUser?.role === Role.ADMIN;
}

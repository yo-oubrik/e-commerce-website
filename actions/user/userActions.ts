import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";
import { convertToSafeUser } from "@/app/utils/helperFunctions/convertToSafeUser";

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        orders: {
          include: {
            products: true,
          },
        },
        reviews: true,
      },
    });

    if (!currentUser) {
      return null;
    }

    return convertToSafeUser(currentUser);
  } catch (err) {
    console.error(err);
    return null;
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

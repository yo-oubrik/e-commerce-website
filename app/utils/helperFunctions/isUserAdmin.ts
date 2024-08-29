import { getCurrentUser } from "@/actions/user/userActions";

export async function isUserAdmin() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return false;
  }
  return true;
}

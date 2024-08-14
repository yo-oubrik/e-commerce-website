import { useCart } from "@/hooks/useCart";
import Container from "../components/Container";
import { useState } from "react";
import { safeUser } from "../product/utils/types";
import { ClientCart } from "./ClientCart";
import { getCurrentUser } from "@/actions/user/userActions";

const Cart = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <div className="py-8">
        <ClientCart currentUser={currentUser} />
      </div>
    </Container>
  );
};

export default Cart;

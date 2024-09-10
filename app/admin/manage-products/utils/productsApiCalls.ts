import axios from "axios";
import toast from "react-hot-toast";

export const handleProductDelete = async (id: string, router: any) => {
  try {
    toast.loading("Deleting product...", { id });
    await axios.delete("/api/product", { data: { id } });
    toast.success("Product deleted successfully", { id });
    router.refresh();
  } catch (error) {
    console.error(`Error trying to delete product with id: ${id}`, error);
    toast.error("Ooops! Something went wrong.");
  }
};

import { z } from "zod";

export const orderValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  productId: z.string().min(1, { message: "Product ID is required" }),
  price: z.number().min(0, { message: "Price is required" }),
  quantity: z.number().min(1, { message: "Quantity is required" }),
});

export default orderValidationSchema;

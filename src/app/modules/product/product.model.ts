import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [String],
  variants: [
    {
      type: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  inventory: {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
});
// Create the model from the schema
const ProductModel = model<IProduct>("product", productSchema);

export default ProductModel;

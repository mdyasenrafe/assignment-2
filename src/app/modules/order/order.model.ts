import mongoose, { Schema, Document } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder & Document>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderModel = mongoose.model<IOrder>("order", orderSchema);

export default OrderModel;

import ProductModel from "../product/product.model";
import { ProductServices } from "../product/product.service";
import { IOrder } from "./order.interface";
import OrderModel from "./order.model";

const createOrderIntoDB = async (orderData: IOrder): Promise<IOrder | null> => {
  const { productId, quantity } = orderData;
  // find product
  const product = await ProductModel.findById(productId);
  if (!product) {
    return null;
  }
  // checking quantity
  if (product.inventory.quantity < quantity) {
    throw new Error("Insufficient quantity available in inventory");
  }
  // update status
  const updatedProduct = await ProductModel.findOneAndUpdate(
    { _id: productId },
    {
      $inc: { "inventory.quantity": -quantity },
      $set: { "inventory.inStock": product.inventory.quantity - quantity > 0 },
    }
  );

  if (!updatedProduct) {
    throw new Error("Failed to update product inventory");
  }

  // finally creating
  const order = new OrderModel(orderData);
  await order.save();

  return order;
};
const getOrdersFromDB = async (): Promise<IOrder[]> => {
  return await OrderModel.find({});
};
const getOrdersByEmailFromDB = async (
  email: string
): Promise<IOrder[] | null> => {
  console.log(email);
  return await OrderModel.find({ email: email });
};

export const orderServices = {
  createOrderIntoDB,
  getOrdersFromDB,
  getOrdersByEmailFromDB,
};

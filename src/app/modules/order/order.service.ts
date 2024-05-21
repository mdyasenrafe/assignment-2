import { ProductServices } from "../product/product.service";
import { IOrder } from "./order.interface";
import OrderModel from "./order.model";

const createOrderIntoDB = async (orderData: IOrder): Promise<IOrder | null> => {
  const { productId } = orderData;
  const productExists = await ProductServices.getProductByIdFromDB(productId);
  console.log("productExists", productExists);
  if (!productExists) {
    return null;
  }

  const order = new OrderModel(orderData);
  return await order.save();
};
const getOrdersFromDB = async () => {};
const getOrdersByEmailFromDB = async (email: string) => {};

export const orderServices = {
  createOrderIntoDB,
  getOrdersFromDB,
  getOrdersByEmailFromDB,
};

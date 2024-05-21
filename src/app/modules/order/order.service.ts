import { IOrder } from "./order.interface";
import OrderModel from "./order.model";

const createOrderIntoDB = (order: IOrder) => {
  return OrderModel.create(order);
};
const getOrdersFromDB = () => {};
const getOrdersByEmailFromDB = (email: string) => {};

export const orderServices = {
  createOrderIntoDB,
  getOrdersFromDB,
  getOrdersByEmailFromDB,
};

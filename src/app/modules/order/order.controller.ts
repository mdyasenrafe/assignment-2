import { Request, Response } from "express";
import { ZodError } from "zod";
import { formatZodError } from "../../apiError/formatZodError";
import orderValidationSchema from "./order.validation";
import { orderServices } from "./order.service";

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const validatedOrder = orderValidationSchema.parse(req.body);
    const order = await orderServices.createOrderIntoDB(validatedOrder);

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Product not found, invalid product ID",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: order,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      const formattedMessage = formatZodError(error);
      res.status(400).json({
        success: false,
        message: formattedMessage,
      });
    } else if (
      error.message === "Insufficient quantity available in inventory"
    ) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: `Failed to create order: ${
          error.message || "Something went wrong"
        }`,
      });
    }
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderServices.getOrdersFromDB();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }
    const orders = await orderServices.getOrdersByEmailFromDB(email);
    if (orders?.length === 0) {
      res.status(404).json({
        success: false,
        message: "Order not found",
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: orders,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const OrderControllers = {
  createNewOrder,
  getAllOrders,
  getOrdersByEmail,
};

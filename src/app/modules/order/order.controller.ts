import { Request, Response } from "express";
import { ZodError } from "zod";
import { formatZodError } from "../../apiError/formatZodError";

const createNewOrder = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    if (error instanceof ZodError) {
      const formattedMessage = formatZodError(error);
      res.status(400).json({
        success: false,
        message: formattedMessage,
      });
    } else {
      console.error(error);
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
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

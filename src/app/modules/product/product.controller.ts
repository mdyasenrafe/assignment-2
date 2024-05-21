import { Request, Response } from "express";
import { productValidationSchema } from "./product.validation";
import { ProductServices } from "./product.service";
import { ZodError, ZodIssue } from "zod";
import { formatZodError } from "../../apiError/formatZodError";

const createNewProduct = async (req: Request, res: Response) => {
  try {
    const validatedProduct = productValidationSchema.parse(req.body);
    const product = await ProductServices.createProductIntoDB(validatedProduct);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: product,
    });
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
        message: `Failed to create product: ${
          error.message || "Something went wrong"
        }`,
      });
    }
  }
};

export const ProductControllers = {
  createNewProduct,
};

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
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const getProductByID = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const products = await ProductServices.getProductByIdFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const validatedProduct = productValidationSchema.parse(req.body);

    const product = await ProductServices.updateProductByFromDB(
      productId,
      validatedProduct
    );
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
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
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await ProductServices.deleteProductByFromDB(productId);
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
export const ProductControllers = {
  createNewProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
};

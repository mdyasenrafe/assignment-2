import { Request, Response } from "express";
import { productValidationSchema } from "./product.validation";
import { ProductServices } from "./product.service";
import { ZodError } from "zod";
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
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getProductByID = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await ProductServices.getProductByIdFromDB(productId);
    if (product) {
      res.status(200).json({
        success: true,
        message: "Product fetched successfully!",
        data: product,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
        data: null,
      });
    }
  } catch (error: any) {
    console.error(error);
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
    if (product) {
      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: product,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
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
        message: `Failed to update product: ${
          error.message || "Something went wrong"
        }`,
      });
    }
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productDeleted = await ProductServices.deleteProductByFromDB(
      productId
    );
    if (productDeleted) {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const searchProducts = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  if (!searchTerm) {
    res.status(400).json({
      success: false,
      message: "Search term is required",
    });
    return;
  }
  try {
    const products = await ProductServices.searchProductsInDB(
      searchTerm.toString()
    );
    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: products,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Failed to search products: ${
        error.message || "Something went wrong"
      }`,
    });
  }
};

export const ProductControllers = {
  createNewProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
  searchProducts,
};

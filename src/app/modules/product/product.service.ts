import { IProduct } from "./product.interface";
import ProductModel from "./product.model";

const createProductIntoDB = async (
  productData: IProduct
): Promise<IProduct> => {
  const product = new ProductModel(productData);
  return await product.save();
};

const getAllProductsFromDB = async (): Promise<IProduct[]> => {
  return await ProductModel.find({});
};

const getProductByIdFromDB = async (
  productId: string
): Promise<IProduct | null> => {
  return await ProductModel.findById(productId);
};

const updateProductByFromDB = async (
  productId: string,
  bodyData: IProduct
): Promise<IProduct | null> => {
  const options = { new: true };
  return await ProductModel.findByIdAndUpdate(productId, bodyData, options);
};

const deleteProductByFromDB = async (
  productId: string
): Promise<IProduct | null> => {
  return await ProductModel.findByIdAndDelete(productId);
};

const searchProductsInDB = async (searchTerm: string): Promise<IProduct[]> => {
  const regex = new RegExp(searchTerm, "i");
  return await ProductModel.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
    ],
  });
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductByFromDB,
  deleteProductByFromDB,
  searchProductsInDB,
};

import { IProduct } from "./product.interface";
import ProductModel from "./product.model";

const createProductIntoDB = async (productData: IProduct) => {
  const product = new ProductModel(productData);
  return await product.save();
};
const getAllProductsFromDB = async () => {
  return await ProductModel.find({});
};

const getProductByIdFromDB = async (productId: string) => {
  return await ProductModel.findById(productId);
};

const updateProductByFromDB = async (productId: string, bodyData: IProduct) => {
  const query = { _id: productId };
  const update = bodyData;
  const options = { new: true };
  return await ProductModel.findOneAndUpdate(query, update, options);
};
const deleteProductByFromDB = async (productId: string) => {
  return await ProductModel.findByIdAndDelete(productId);
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductByFromDB,
  deleteProductByFromDB,
};

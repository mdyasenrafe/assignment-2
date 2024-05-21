import { IProduct } from "./product.interface";
import ProductModel from "./product.model";

const createProductIntoDB = async (productData: IProduct) => {
  const product = new ProductModel(productData);
  return await product.save();
};
const getAllProductsFromDB = async () => {
  return await ProductModel.find({});
};

const getProductByIdFromDB = async (id: string) => {
  return await ProductModel.findById(id);
};

const updateProductByFromDB = async (id: string, bodyData: IProduct) => {
  const query = { _id: id };
  const update = bodyData;
  const options = { new: true };
  return await ProductModel.findOneAndUpdate(query, update, options);
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductByFromDB,
};

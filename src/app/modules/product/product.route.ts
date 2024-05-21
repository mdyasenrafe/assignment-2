import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.post("/", ProductControllers.createNewProduct);
router.get("/", ProductControllers.getAllProducts);
router.get("/:productId", ProductControllers.getProductByID);
router.put("/:productId", ProductControllers.updateProduct);

export const ProductRoutes = router;

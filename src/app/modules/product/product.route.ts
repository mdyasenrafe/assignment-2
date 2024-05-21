import express, { Request, Response } from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  if (req.query.searchTerm) {
    ProductControllers.searchProducts(req, res);
  } else {
    ProductControllers.getAllProducts(req, res);
  }
});

router.post("/", ProductControllers.createNewProduct);
router.get("/:productId", ProductControllers.getProductByID);
router.put("/:productId", ProductControllers.updateProduct);
router.delete("/:productId", ProductControllers.deleteProduct);

export const ProductRoutes = router;

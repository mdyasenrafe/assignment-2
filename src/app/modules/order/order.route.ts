import express, { Request, Response } from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  if (req.query.email) {
    OrderControllers.getOrdersByEmail(req, res);
  } else {
    OrderControllers.getAllOrders(req, res);
  }
});

// routes
router.post("/", OrderControllers.createNewOrder);

export const OrderRoutes = router;

import cors from "cors";
import express, { Application, Request, Response } from "express";
import { ProductRoutes } from "./app/modules/product/product.route";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(
  express.urlencoded({ limit: "25mb", extended: true, parameterLimit: 50000 })
);

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the API.");
});

// application routes
app.use("/api/products", ProductRoutes);

// Undefined Route Handling
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: true, message: "Route not found." });
});

export default app;

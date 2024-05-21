import mongoose from "mongoose";
import app from "./app";

const port: number = 5001;

require("dotenv").config();

//database connection
async function bootstrap() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@practice-cluster.4jfud1m.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server is  listening on port ${port}`);
    });
  } catch (err) {
    console.log(`Failed to connect database`, err);
  }
}

bootstrap();

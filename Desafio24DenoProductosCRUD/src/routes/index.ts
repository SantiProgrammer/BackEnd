import { Router } from "../deps.ts";
import {
  handleDeleteProduct,
  handleFindProduct,
  handleCreate,
  handleUpdate,
  handleAll,
} from "../handlers/product.ts";

export const router = new Router()
  .get("/api/products", handleAll)
  .get("/api/products/:id", handleFindProduct)
  .delete("/api/products/:id", handleDeleteProduct)
  .put("/api/products/:id", handleUpdate)
  .post("/api/products", handleCreate);

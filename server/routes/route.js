import express from "express";

import {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  del_Transaction,
  get_Labels,
} from "../controller/controller.js";

const router = express.Router();

router.route("/api/categories").post(create_Categories).get(get_Categories);

router
  .route("/api/transaction")
  .post(create_Transaction)
  .get(get_Transaction)
  .delete(del_Transaction);

router.route("/api/labels").get(get_Labels);

export default router;

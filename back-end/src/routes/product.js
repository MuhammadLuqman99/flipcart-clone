const express = require("express");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const {
  requireSignin,
  adminMiddleware,
} = require("../common-middleware/indes");
const { createProduct } = require("../controller/product");
const router = express.Router();
const Product = require("../models/product");

// const { addCategory, getCategories } = require("../controller/category");

router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);

// router.get("/category/getcategories", getCategories);

module.exports = router;

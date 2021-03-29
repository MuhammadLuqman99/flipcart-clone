const express = require("express");
const {
  requireSignin,
  adminMiddleware,
} = require("../common-middleware/indes");
const router = express.Router();

const { addCategory, getCategories } = require("../controller/category");

router.post("/category/create", requireSignin, adminMiddleware, addCategory);
router.get("/category/getcategories", getCategories);

module.exports = router;

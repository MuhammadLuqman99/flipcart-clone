const Product = require("../models/product");
const shortid = require("shortid");
const slufify = require("slugify");

exports.createProduct = (req, res) => {
  const { name, price, description, category, quantity, createdBy } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: name,
    slug: slufify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });
  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (Product) {
      return res.status(400).json({ product });
    }
  });
};

// res.status(200).json({ file: req.files, body: req.body });

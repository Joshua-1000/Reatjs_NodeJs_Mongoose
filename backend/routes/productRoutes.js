const express = require("express");
const Product = require("../models/productModel");
const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } = require("../controller/productController");

const router = express.Router();




router.post(["/", "/"], createProduct);

router.get(["/", "/"], getAllProducts);



router.get(["/:id", "/:id"], getSingleProduct);

router.put(["/:id", "/:id"], updateProduct);

router.delete(["/:id", "/:id"], deleteProduct);



module.exports = router;
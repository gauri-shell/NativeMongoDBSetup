// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");


router.get("/", productController.getAllProducts);
router.get("/add", productController.renderAddProductForm);
router.post("/add-mongo-product", productController.addProduct);

router.get("/edit/:id", productController.renderEditProductForm);
router.post("/edit/:id", productController.updateProduct);
router.get("/delete/:id", productController.deleteProduct);


module.exports = router;

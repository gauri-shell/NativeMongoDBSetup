const { getDB } = require("../models/db");
const { ObjectId } = require("mongodb");

// Display all products
exports.getAllProducts = async (req, res) => {
  try {
    const db = getDB();
    const products = await db.collection("products").find().toArray();
    res.render("index", { products });
  } catch (err) {
    res.status(500).send("Error fetching products");
  }
};

// Render add product form
exports.renderAddProductForm = (req, res) => {
  res.render("addProduct", { title: "Add Product" });
};

// Add a new product
exports.addProduct = async (req, res) => {
  console.log("Form Data:", req.body);
  const { title, price, description, imageUrl } = req.body;

  try {
    const db = getDB();
    await db.collection("products").insertOne({
      title,
      price: parseFloat(price), // Convert price to a number
      description,
      imageUrl,
    });
    res.redirect("/");
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).send("Error adding product");
  }
};

// Render edit product form
exports.renderEditProductForm = async (req, res) => {
  try {
    const db = getDB();
    const product = await db.collection("products").findOne({ _id: new ObjectId(req.params.id) });
    res.render("editProduct", { product });
  } catch (err) {
    res.status(500).send("Error fetching product data");
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const db = getDB();
    const { title, price, description, imageUrl } = req.body;
    await db.collection("products").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { title, price: parseFloat(price), description, imageUrl } }
    );
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error updating product");
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const db = getDB();
    await db.collection("products").deleteOne({ _id: new ObjectId(req.params.id) });
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error deleting product");
  }
};

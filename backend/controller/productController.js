
const Product = require("../models/productModel");


const createProduct = async (req, res) => {
    try {
        const { name, quantity, price, image } = req.body;

        if (!name || quantity == null || price == null) {
            return res.status(400).json({ error: "name, quantity, and price are required" });
        }

        const product = await Product.create({
            name,
            quantity,
            price,
            image,
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ error: "Failed to create product" });
    }
}


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
        console.log("Fetched products:", products);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
}


const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error.message);
        res.status(500).json({ error: "Failed to fetch product" });
    }
}

const updateProduct = async (req, res) => {
	try {
		const { name, quantity, price, image } = req.body;

		if (!name || quantity == null || price == null) {
			return res.status(400).json({ error: "name, quantity, and price are required" });
		}

		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{ name, quantity, price, image },
			{ new: true },
		);

		if (!updatedProduct) {
			return res.status(404).json({ error: "Product not found" });
		}

		res.status(200).json(updatedProduct);
	} catch (error) {
		console.error("Error updating product:", error.message);
		res.status(500).json({ error: "Failed to update product" });
	}
}


const deleteProduct = async (req, res) => {
	try {
		const deletedProduct = await Product.findByIdAndDelete(req.params.id);
		if (!deletedProduct) {
			return res.status(404).json({ error: "Product not found" });
		}
		res.status(200).json({ message: "Product deleted" });
	} catch (error) {
		console.error("Error deleting product:", error.message);
		res.status(500).json({ error: "Failed to delete product" });
	}
}




module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
};
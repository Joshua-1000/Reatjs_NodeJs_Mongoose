const dns = require("dns");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Product = require("./models/productModel");

// Force a reliable DNS resolver (Google DNS) before anything else runs.
// This helps on networks/ISPs where the default resolver fails or times out
// on SRV lookups (the _mongodb._tcp.* records Atlas uses for mongodb+srv://).
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoDBconnection = process.env.MONGODB_URI;

if (!mongoDBconnection) {
	console.error("✗ MONGODB_URI is not set. Check your .env file.");
	process.exit(1);
}

async function connectDB() {
	try {
		await mongoose.connect(mongoDBconnection, {
			serverSelectionTimeoutMS: 10000, // fail fast instead of hanging
		});
		console.log("✓ Connected to MongoDB");
	} catch (error) {
		console.error("✗ Error connecting to MongoDB:", error.message);
		// Retry after a short delay instead of leaving the app in a broken state
		console.log("Retrying connection in 5 seconds...");
		setTimeout(connectDB, 5000);
	}
}

connectDB();

// Log connection state changes (useful for catching drops after initial connect)
mongoose.connection.on("disconnected", () => {
	console.warn("⚠ MongoDB disconnected");
});
mongoose.connection.on("reconnected", () => {
	console.log("✓ MongoDB reconnected");
});







app.post(["/products", "/api/products"], async (req, res) => {
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
});

app.get(["/products/:id", "/api/products/:id"], async (req, res) => {
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
});

app.put(["/products/:id", "/api/products/:id"], async (req, res) => {
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
});

app.delete(["/products/:id", "/api/products/:id"], async (req, res) => {
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
});

app.get(["/products", "/api/products"], async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json(products);
		console.log("Fetched products:", products);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch products" });
	}
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
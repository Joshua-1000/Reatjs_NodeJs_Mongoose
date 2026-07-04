const dns = require("dns");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Product = require("./models/productModel");
const productRoutes = require("./routes/productRoutes");

// Force a reliable DNS resolver (Google DNS) before anything else runs.
// This helps on networks/ISPs where the default resolver fails or times out
// on SRV lookups (the _mongodb._tcp.* records Atlas uses for mongodb+srv://).
dns.setServers(["8.8.8.8", "8.8.4.4"]);



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use(['/api/products','/products'], productRoutes);



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






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
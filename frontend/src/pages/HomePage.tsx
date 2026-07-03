import { useEffect, useState } from "react";
import axios from "axios";

import Product from "../components/Product";

interface ProductItem {
  _id?: string;
  id?: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}



const HomePage = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`);
      setProducts((prevProducts) => prevProducts.filter((product) => (product._id || product.id) !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Unable to delete product. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Product key={product._id || product.id} {...product} onDelete={handleDelete} />
              ))}
            </div>
          ) : (
            <div>There is no product available.</div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;




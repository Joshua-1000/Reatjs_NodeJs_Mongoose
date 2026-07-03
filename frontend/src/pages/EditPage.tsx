
import axios from "axios";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ProductFormState {
  name: string;
  quantity: string;
  price: number;
  imageURL: string;
}

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProductFormState>({
    name: "",
    quantity: "",
    price: 0,
    imageURL: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        const product = response.data;

        setFormData({
          name: product.name || "",
          quantity: String(product.quantity ?? ""),
          price: product.price ?? 0,
          imageURL: product.image || "",
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (field: keyof ProductFormState, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id || !formData.name.trim() || !formData.quantity || !formData.price || !formData.imageURL.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/products/${id}`, {
        name: formData.name.trim(),
        quantity: Number(formData.quantity),
        price: formData.price,
        image: formData.imageURL.trim(),
      });

      alert("Product updated successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Unable to update product. Please try again.");
    }
  };

  // const handleDelete = async () => {
  //   if (!id) return;

  //   try {
  //     await axios.delete(`http://localhost:5000/products/${id}`);
  //     alert("Product deleted successfully.");
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //     alert("Unable to delete product. Please try again.");
  //   }
  // };

  if (loading) {
    return <div className="p-6 text-center">Loading product...</div>;
  }

  return (
    <div className="mx-auto mt-6 max-w-lg rounded bg-white p-5 shadow-lg">
      <h1 className="mb-3 text-2xl font-bold">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            id="imageURL"
            type="text"
            value={formData.imageURL}
            onChange={(e) => handleChange("imageURL", e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Update Product
          </button>
          {/* <button
            type="button"
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete Product
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default EditPage;
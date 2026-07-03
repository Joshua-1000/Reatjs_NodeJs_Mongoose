import axios from "axios";
import { useState } from "react";
import type { FormEvent } from "react";

const CreatePage = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(0);
  const [imageURL, setImageURL] = useState("");


  const saveProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !quantity || !price || !imageURL) {
      alert("Please fill in all fields.");
      return;
    }

    const productData = {
      name: name.trim(),
      quantity: parseInt(quantity, 10),
      price,
      image: imageURL.trim(),
    };

    try {
      const response = await axios.post("http://localhost:3000/products", productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const savedProduct = response.data;
      console.log("Product saved:", savedProduct);
      alert("Product saved successfully.");

      setName("");
      setQuantity("");
      setPrice(0);
      setImageURL("");
      
    } catch (error) {
      console.error(error);
      alert("Unable to save product. Please try again.");
    }
  };

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-5 rounded mt-6">
      <h1 className="text-2xl font-bold mb-3">Create Product</h1>
      <form onSubmit={saveProduct}>
        <div className="mb-3">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            quantity
          </label>
          <input
          type="number"
            id="quantity"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            step="0.01"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="imageURL"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Product
        </button>
      </form>
    </div>
  )
}

export default CreatePage
import { Link } from "react-router-dom";

interface ProductProps {
  _id?: string;
  id?: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  onDelete?: (id: string) => void;
}

const Product = ({ _id, id, name, quantity, price, image, onDelete }: ProductProps) => {
  const productId = _id || id;

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <img src={image} alt={name} className="h-48 w-full object-contain bg-gray-50 p-4" />
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
        <p className="text-base font-medium text-gray-900">${price}</p>
      </div>
      <div className="px-4 pb-4 space-y-[3px]">
        <Link
          to={productId ? `/edit/${productId}` : "/edit"}
          className="block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => productId && onDelete?.(productId)}
          className="block w-full rounded-md bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Product;
import { NavLink } from "react-router";

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive
      ? "bg-white text-gray-900"
      : "text-gray-300 hover:bg-gray-800 hover:text-white"
  }`;

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 bg-gray-900 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        <NavLink to="/" className="text-xl font-bold tracking-tight text-white">
          Product<span className="text-indigo-400">Store</span>
        </NavLink>
        <div className="flex items-center gap-2">
          <NavLink to="/" end className={linkClasses}>
            Home
          </NavLink>
          <NavLink to="/create" className={linkClasses}>
            Create
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

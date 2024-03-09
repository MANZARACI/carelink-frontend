import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="bg-zinc-800 shadow-xl font-semibold text-white flex justify-center md:justify-end sm:px-24 py-2">
      <ul className="flex items-center space-x-4">
        <li>
          <Link className="hover:bg-zinc-700 rounded-md p-2" to="/locations">
            Locations
          </Link>
        </li>
        <li>
          <Link className="hover:bg-zinc-700 rounded-md p-2" to="/settings">
            Settings
          </Link>
        </li>
        <li>
          <button className="hover:bg-zinc-700 rounded-md p-2" onClick={logout}>
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

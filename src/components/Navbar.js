import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const navItems = [
  { barName: "Calendar", path: "/calendar" },
  { barName: "Locations", path: "/locations" },
  { barName: "Settings", path: "/settings" },
];

const Navbar = () => {
  const { logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen((current) => !current);
  };

  return (
    <nav className="bg-zinc-800 shadow-xl font-semibold text-white md:flex md:justify-between md:items-center md:px-32">
      <div className="m-md:hidden font-bold">CareLink</div>
      <ul className="flex m-md:flex-col items-center m-md:space-y-4 md:space-x-2 py-2">
        <li className="self-end md:hidden">
          <button onClick={toggleNavbar} className="mx-2">
            <svg
              className="w-8"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>
        </li>
        {navItems.map((item, i) => {
          return (
            <li key={i} className={!isOpen ? "m-md:hidden" : undefined}>
              <Link className="hover:bg-zinc-700 rounded-md p-2" to={item.path}>
                {item.barName}
              </Link>
            </li>
          );
        })}
        <li className={!isOpen ? "m-md:hidden" : undefined}>
          <button className="hover:bg-zinc-700 rounded-md p-2" onClick={logout}>
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

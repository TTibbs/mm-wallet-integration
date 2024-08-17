import React from "react";
import WalletConnect from "./WalletConnect";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          My dApp
        </Link>
        <WalletConnect />
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto mt-8 p-4">
          <h1 className="text-3xl font-bold mb-4">Welcome to My dApp</h1>
          <p className="text-gray-600">
            This is a simple dApp with MetaMask wallet integration. Use the
            button in the navbar to connect your wallet.
          </p>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

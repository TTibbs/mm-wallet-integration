import React, { useState, useEffect } from "react";

const WalletConnect = () => {
  const [account, setAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setAccount(accounts[0]);
        setIsConnected(true);
        localStorage.setItem("walletConnected", "true");
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const signOut = () => {
    setAccount("");
    setIsConnected(false);
    localStorage.removeItem("walletConnected");
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (
          accounts.length > 0 &&
          localStorage.getItem("walletConnected") === "true"
        ) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      }
    };

    checkConnection();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (
          accounts.length > 0 &&
          localStorage.getItem("walletConnected") === "true"
        ) {
          setAccount(accounts[0]);
          setIsConnected(true);
        } else {
          signOut();
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, []);

  return (
    <div>
      {isConnected ? (
        <div className="flex items-center space-x-2">
          <span className="text-white">
            {`${account.slice(0, 6)}...${account.slice(-4)}`}
          </span>
          <button
            onClick={signOut}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;

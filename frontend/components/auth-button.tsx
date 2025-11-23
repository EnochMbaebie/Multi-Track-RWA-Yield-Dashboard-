"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useWallets } from "@privy-io/react-auth";
import { useLoginWithOAuth } from "@privy-io/react-auth";

export function AuthButton() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const { initOAuth, loading: isOAuthLoading, state } = useLoginWithOAuth();

  if (!ready) {
    return (
      <div className="rounded-lg bg-gray-800 px-4 py-2 text-gray-400">
        Loading...
      </div>
    );
  }

  if (!authenticated) {
    const handleGoogleLogin = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
          alert("Privy App ID is not configured. Please set NEXT_PUBLIC_PRIVY_APP_ID in your .env file.");
          return;
        }
        
        console.log("Initiating Google OAuth...", { 
          appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID?.substring(0, 10) + "...",
          state: state 
        });
        
        await initOAuth({ provider: "google" });
        console.log("OAuth initiated successfully");
      } catch (error) {
        console.error("Google login failed:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        alert(`Google login failed: ${errorMessage}\n\nMake sure:\n1. Google OAuth is enabled in Privy Dashboard\n2. Redirect URIs are configured\n3. Your app ID is correct`);
      }
    };

    return (
      <div className="flex items-center gap-2">
        <button
          onClick={login}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/50"
        >
          Login
        </button>
      </div>
    );
  }

  const embeddedWallet = wallets.find((w) => w.walletClientType === "privy");
  const walletAddress = embeddedWallet?.address || "No wallet";

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-1.5">
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
        <span className="font-mono text-xs font-medium text-green-400">
          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </span>
      </div>
      <button
        onClick={logout}
        className="rounded-lg border border-gray-700/50 bg-gray-800/50 px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-gray-700/50 hover:border-gray-600 transition-all"
      >
        Logout
      </button>
    </div>
  );
}


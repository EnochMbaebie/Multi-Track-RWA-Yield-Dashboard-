"use client";

import { useState } from "react";
import { useConnection, useChainId, useWriteContract } from "wagmi";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import {
  getAgentRegistryAddress,
  generateAgentId,
  prepareStrategy,
  TRADING_AGENT_REGISTRY_ABI,
  type CreateAgentParams,
} from "@/lib/agent/agent-registry";
import { getPriceFeedId } from "@/lib/privy/pyth-contract";
import { getTokenAddress } from "@/lib/1inch/1inch-contract";

export default function CreateAgentPage() {
  const { address } = useConnection();
  const chainId = useChainId();
  const router = useRouter();
  const { writeContractAsync, isPending } = useWriteContract();

  const [formData, setFormData] = useState<CreateAgentParams>({
    agentName: "",
    ensLabel: "",
    priceFeedSymbol: "ETH",
    triggerPrice: 3000,
    triggerAbove: true,
    tokenIn: "WETH",
    tokenOut: "USDC",
    amountIn: 0.1,
    cooldownPeriod: 3600, // 1 hour
  });

  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      setError("Please connect your wallet");
      return;
    }

    setCreating(true);
    setError(null);

    try {
      // Generate agent ID
      const agentId = generateAgentId(formData.agentName);

      // Prepare strategy
      const strategy = await prepareStrategy(formData, chainId);

      // Create agent on contract
      const txHash = await writeContractAsync({
        address: getAgentRegistryAddress(chainId),
        abi: TRADING_AGENT_REGISTRY_ABI,
        functionName: "createAgent",
        args: [agentId, formData.ensLabel, strategy],
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error creating agent:", err);
      setError(err.message || "Failed to create agent");
      setCreating(false);
    }
  };

  if (!address) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navigation />
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
            <p className="text-gray-400">Please connect your wallet to create an agent.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navigation />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Create Trading Agent</h1>
          <p className="mt-2 text-gray-400">Set up an automated trading agent with price triggers</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Agent Name */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Agent Information</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Agent Name
                </label>
                <input
                  type="text"
                  value={formData.agentName}
                  onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
                  placeholder="my-trading-agent"
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  ENS Label
                </label>
                <input
                  type="text"
                  value={formData.ensLabel}
                  onChange={(e) => setFormData({ ...formData, ensLabel: e.target.value })}
                  placeholder="my-agent"
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  This will create: {formData.ensLabel ? `${formData.ensLabel}.alatfi.eth` : "..."}
                </p>
              </div>
            </div>
          </div>

          {/* Trading Strategy */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Trading Strategy</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Price Feed
                  </label>
                  <select
                    value={formData.priceFeedSymbol}
                    onChange={(e) => setFormData({ ...formData, priceFeedSymbol: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="ETH">ETH/USD</option>
                    <option value="BTC">BTC/USD</option>
                    <option value="USDC">USDC/USD</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Trigger Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.triggerPrice}
                    onChange={(e) => setFormData({ ...formData, triggerPrice: parseFloat(e.target.value) })}
                    required
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Trigger Condition
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={formData.triggerAbove}
                      onChange={() => setFormData({ ...formData, triggerAbove: true })}
                      className="h-4 w-4 border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-300">Execute when price is above trigger</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={!formData.triggerAbove}
                      onChange={() => setFormData({ ...formData, triggerAbove: false })}
                      className="h-4 w-4 border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-300">Execute when price is below trigger</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Token In (Sell)
                  </label>
                  <select
                    value={formData.tokenIn}
                    onChange={(e) => setFormData({ ...formData, tokenIn: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="WETH">WETH</option>
                    <option value="USDC">USDC</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Token Out (Buy)
                  </label>
                  <select
                    value={formData.tokenOut}
                    onChange={(e) => setFormData({ ...formData, tokenOut: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="USDC">USDC</option>
                    <option value="WETH">WETH</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Amount to Trade
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amountIn}
                  onChange={(e) => setFormData({ ...formData, amountIn: parseFloat(e.target.value) })}
                  placeholder="0.1"
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">Leave as 0 to use full balance</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Cooldown Period (seconds)
                </label>
                <input
                  type="number"
                  value={formData.cooldownPeriod}
                  onChange={(e) => setFormData({ ...formData, cooldownPeriod: parseInt(e.target.value) })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Minimum time between executions ({Math.floor(formData.cooldownPeriod / 60)} minutes)
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-800 bg-red-900/20 p-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={creating || isPending}
              className="flex-1 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {creating || isPending ? "Creating..." : "Create Agent"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="rounded-lg border border-gray-700 bg-gray-800 px-6 py-3 text-sm font-semibold text-gray-300 hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


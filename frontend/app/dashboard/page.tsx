"use client";

import { useState, useEffect } from "react";
import { useConnection, useChainId, useReadContract, useWriteContract } from "wagmi";
import { Address, Hash } from "viem";
import { Navigation } from "@/components/navigation";
import { 
  getAgentRegistryAddress, 
  generateAgentId,
  TRADING_AGENT_REGISTRY_ABI,
  type Agent 
} from "@/lib/agent/agent-registry";
import { getPriceFeedId } from "@/lib/privy/pyth-contract";
import { formatPrice } from "@/lib/privy/pyth-service";
import Link from "next/link";

export default function DashboardPage() {
  const { address } = useConnection();
  const chainId = useChainId();
  const { writeContractAsync } = useWriteContract();

  const [agentIds, setAgentIds] = useState<Hash[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get user's agents
  const { data: userAgentIds, refetch: refetchAgents } = useReadContract({
    address: address ? getAgentRegistryAddress(chainId) : undefined,
    abi: TRADING_AGENT_REGISTRY_ABI,
    functionName: "getUserAgents",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Fetch agent details
  useEffect(() => {
    if (userAgentIds && Array.isArray(userAgentIds)) {
      setAgentIds(userAgentIds as Hash[]);
      setLoading(false);
    } else if (address && !userAgentIds) {
      setLoading(false);
    }
  }, [userAgentIds, address]);

  // Fetch each agent's details
  useEffect(() => {
    if (agentIds.length === 0) {
      setAgents([]);
      return;
    }

    const fetchAgents = async () => {
      try {
        setLoading(true);
        const agentPromises = agentIds.map(async (agentId) => {
          try {
            const res = await fetch(`/api/agent/${agentId}?chainId=${chainId}`);
            if (!res.ok) return null;
            return await res.json();
          } catch {
            return null;
          }
        });
        const agentData = await Promise.all(agentPromises);
        setAgents(agentData.filter(Boolean));
      } catch (err) {
        console.error("Error fetching agents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [agentIds, chainId]);

  const handleDeactivate = async (agentId: Hash) => {
    if (!address) return;

    try {
      await writeContractAsync({
        address: getAgentRegistryAddress(chainId),
        abi: TRADING_AGENT_REGISTRY_ABI,
        functionName: "deactivateAgent",
        args: [agentId],
      });
      refetchAgents();
    } catch (err: any) {
      console.error("Error deactivating agent:", err);
      alert(`Failed to deactivate agent: ${err.message}`);
    }
  };

  if (!address) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navigation />
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
            <p className="text-gray-400">Please connect your wallet to view your agents.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navigation />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Agent Dashboard</h1>
            <p className="mt-2 text-gray-400">Manage your automated trading agents</p>
          </div>
          <Link
            href="/create"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            Create New Agent
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading agents...</p>
          </div>
        ) : agents.length === 0 ? (
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-12 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">No Agents Yet</h2>
            <p className="text-gray-400 mb-6">
              Create your first automated trading agent to get started.
            </p>
            <Link
              href="/create"
              className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Create Your First Agent
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent, index) => (
              <AgentCard
                key={agentIds[index]}
                agentId={agentIds[index]}
                agent={agent}
                chainId={chainId}
                onDeactivate={handleDeactivate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AgentCard({
  agentId,
  agent,
  chainId,
  onDeactivate,
}: {
  agentId: Hash;
  agent: Agent;
  chainId: number;
  onDeactivate: (agentId: Hash) => void;
}) {
  const { data: triggerData } = useReadContract({
    address: getAgentRegistryAddress(chainId),
    abi: TRADING_AGENT_REGISTRY_ABI,
    functionName: "checkTrigger",
    args: [agentId],
    query: {
      enabled: agent.exists,
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  });

  const [triggerMet, currentPrice] = triggerData || [false, 0n];
  const priceValue = currentPrice ? Number(currentPrice) / 1e8 : 0;
  const triggerPrice = Number(agent.strategy.triggerPrice) / 1e8;

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{agent.ensName || "Unnamed Agent"}</h3>
          <p className="text-sm text-gray-400 mt-1 font-mono">{agentId.slice(0, 10)}...</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            agent.strategy.isActive
              ? "bg-green-500/20 text-green-400"
              : "bg-gray-500/20 text-gray-400"
          }`}
        >
          {agent.strategy.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500">Current Price</p>
          <p className="text-lg font-semibold text-white">
            ${priceValue.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Trigger Price</p>
          <p className="text-sm font-medium text-white">
            ${triggerPrice.toFixed(2)} ({agent.strategy.triggerAbove ? "Above" : "Below"})
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Status</p>
          <p className={`text-sm font-medium ${triggerMet ? "text-green-400" : "text-gray-400"}`}>
            {triggerMet ? "✓ Trigger Met" : "Waiting for trigger..."}
          </p>
        </div>

        <div className="pt-3 border-t border-gray-800">
          <button
            onClick={() => onDeactivate(agentId)}
            disabled={!agent.strategy.isActive}
            className="w-full rounded-lg bg-red-600/20 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}


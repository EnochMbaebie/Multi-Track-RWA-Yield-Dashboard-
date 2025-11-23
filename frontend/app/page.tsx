import Link from "next/link";
import { Navigation } from "@/components/navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navigation />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-6xl font-bold tracking-tight text-white sm:text-7xl">
            No Complexity.
            <br />
            Just{" "}
            <span className="text-indigo-400">Secure</span> wallet infrastructure
            for{" "}
            <span className="text-indigo-400">Automated Trading</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-2xl leading-9 text-gray-400">
            Create ENS-named autonomous trading agents that execute trades
            automatically based on price triggers. Gasless, seamless, and fully
            automated.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/50 hover:bg-indigo-500 transition-colors">
              Get started for free
            </button>
            <button className="rounded-lg border border-gray-700 bg-gray-900/50 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800/50 transition-colors">
              Explore our API docs
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="border-y border-gray-800/50 bg-gray-900/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">$0</div>
              <div className="mt-2 text-base font-medium text-gray-400">
                total transaction volume
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">0</div>
              <div className="mt-2 text-base font-medium text-gray-400">
                wallets created
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">0</div>
              <div className="mt-2 text-base font-medium text-gray-400">
                total transactions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            our core features
          </h2>
          <p className="mt-4 text-xl leading-8 text-gray-400">
            Plug-and-play APIs, non-custodial wallets, gasless transactions,
            and automated execution — simplifying blockchain complexity so you
            can focus on your trading strategies.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="flex flex-col rounded-xl border border-gray-800 bg-gray-900/50 p-8 shadow-lg shadow-indigo-500/10 hover:border-indigo-500/50 transition-colors">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/20">
              <svg
                className="h-6 w-6 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">
              Automated Execution
            </h3>
            <p className="mt-2 text-base leading-7 text-gray-400">
              Execute trades automatically when price triggers are met, even
              when you're offline.
            </p>
            <a
              href="#"
              className="mt-4 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Learn more →
            </a>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col rounded-xl border border-gray-800 bg-gray-900/50 p-8 shadow-lg shadow-indigo-500/10 hover:border-indigo-500/50 transition-colors">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/20">
              <svg
                className="h-6 w-6 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818l3.182 3.182 3.182-3.182M12 6L8.818 8.818 12 11.636m0-5.636l3.182 2.182L12 11.636"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">
              Gasless Transactions
            </h3>
            <p className="mt-2 text-base leading-7 text-gray-400">
              Enable seamless transactions with sponsored network fees,
              abstracting away the friction.
            </p>
            <a
              href="#"
              className="mt-4 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Learn more →
            </a>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col rounded-xl border border-gray-800 bg-gray-900/50 p-8 shadow-lg shadow-indigo-500/10 hover:border-indigo-500/50 transition-colors">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/20">
              <svg
                className="h-6 w-6 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">
              ENS-Named Agents
            </h3>
            <p className="mt-2 text-base leading-7 text-gray-400">
              Each trading agent gets its own ENS subname for easy
              identification and sharing.
            </p>
            <a
              href="#"
              className="mt-4 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Learn more →
            </a>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col rounded-xl border border-gray-800 bg-gray-900/50 p-8 shadow-lg shadow-indigo-500/10 hover:border-indigo-500/50 transition-colors">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/20">
              <svg
                className="h-6 w-6 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">
              Price Triggers
            </h3>
            <p className="mt-2 text-base leading-7 text-gray-400">
              Set automated buy/sell orders based on real-time price feeds from
              Pyth Network.
            </p>
            <a
              href="#"
              className="mt-4 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Learn more →
            </a>
          </div>

          {/* Feature 5 */}
          <div className="flex flex-col rounded-xl border border-gray-800 bg-gray-900/50 p-8 shadow-lg shadow-indigo-500/10 hover:border-indigo-500/50 transition-colors">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/20">
              <svg
                className="h-6 w-6 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">
              Non-Custodial Wallets
            </h3>
            <p className="mt-2 text-base leading-7 text-gray-400">
              Users maintain full control of their funds with embedded wallets
              powered by Privy.
            </p>
            <a
              href="#"
              className="mt-4 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Learn more →
            </a>
          </div>

          {/* Feature 6 */}
          <div className="flex flex-col rounded-xl border border-gray-800 bg-gray-900/50 p-8 shadow-lg shadow-indigo-500/10 hover:border-indigo-500/50 transition-colors">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/20">
              <svg
                className="h-6 w-6 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-3.75v3.75m-3 .75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">
              1inch Integration
            </h3>
            <p className="mt-2 text-base leading-7 text-gray-400">
              Execute swaps with best rates using 1inch's aggregation protocol.
            </p>
            <a
              href="#"
              className="mt-4 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Learn more →
            </a>
          </div>
        </div>
      </section>

      {/* Pyth Price Feed Demo */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mt-12 flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/50"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/create"
              className="rounded-lg border border-indigo-500 bg-indigo-500/10 px-8 py-4 text-lg font-semibold text-indigo-400 hover:bg-indigo-500/20 transition-colors"
            >
              Create Agent
            </Link>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section
        id="use-cases"
        className="border-y border-gray-800/50 bg-gray-900/30"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              use cases
            </h2>
            <p className="mt-4 text-xl leading-8 text-gray-400">
              Learn how traders use automated agents to execute strategies
              that can be tailored to market conditions but also built to scale
              across assets.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
            {/* Use Case 1 */}
            <div className="flex flex-col rounded-xl border border-gray-800 bg-gray-900/50 p-8 shadow-lg shadow-indigo-500/10 hover:border-indigo-500/50 transition-colors">
              <h3 className="text-xl font-semibold text-white">
                Automated DCA (Dollar Cost Averaging)
              </h3>
              <p className="mt-4 text-base leading-7 text-gray-400">
                Set up recurring purchases at regular intervals or when prices
                drop by a certain percentage, automating your accumulation
                strategy.
              </p>
              <a
                href="#"
                className="mt-6 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                READ MORE →
              </a>
            </div>

            {/* Use Case 2 */}
            <div className="flex flex-col rounded-xl border border-gray-800 bg-gray-900/50 p-8 shadow-lg shadow-indigo-500/10 hover:border-indigo-500/50 transition-colors">
              <h3 className="text-xl font-semibold text-white">
                Price-Based Triggers
              </h3>
              <p className="mt-4 text-base leading-7 text-gray-400">
                Automatically buy or sell when assets hit target prices, using
                real-time price feeds from Pyth Network for accurate execution.
              </p>
              <a
                href="#"
                className="mt-6 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                READ MORE →
              </a>
            </div>

            {/* Use Case 3 */}
            <div className="flex flex-col rounded-xl border border-gray-800 bg-gray-900/50 p-8 shadow-lg shadow-indigo-500/10 hover:border-indigo-500/50 transition-colors">
              <h3 className="text-xl font-semibold text-white">
                Stop-Loss Protection
              </h3>
              <p className="mt-4 text-base leading-7 text-gray-400">
                Protect your positions with automated stop-loss orders that
                execute instantly when prices fall below your threshold.
              </p>
              <a
                href="#"
                className="mt-6 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                READ MORE →
              </a>
            </div>

            {/* Use Case 4 */}
            <div className="flex flex-col rounded-xl border border-gray-800 bg-gray-900/50 p-8 shadow-lg shadow-indigo-500/10 hover:border-indigo-500/50 transition-colors">
              <h3 className="text-xl font-semibold text-white">
                Multi-Asset Strategies
              </h3>
              <p className="mt-4 text-base leading-7 text-gray-400">
                Create complex trading strategies that interact with multiple
                assets and chains, all managed through named ENS agents.
              </p>
              <a
                href="#"
                className="mt-6 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                READ MORE →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0f] border-t border-gray-800/50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="pt-8">
            <p className="text-center text-sm text-gray-500">
              Built with Privy, Pyth Network, 1inch, ENS, and Filecoin
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

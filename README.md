# Golem Marketplace

The Golem Marketplace Explorer is a Next.js-based frontend for browsing real-time offers on the Golem Network. Each offer represents a set of available computing resources, such as CPU time, along with its corresponding price in GLM. This tool provides a live view of active providers on the network and can be especially useful for debugging, testing, or exploring local or custom Golem setups.

## Why Install This

This app is primarily intended for:
- Developers running a **local Golem testnet**
- Researchers experimenting with **custom deployments**
- Operators building or analyzing **private compute networks**

If you're just using the main Golem network to buy or sell compute, this tool might not be necessary.

## Configuration

To configure the app, open up: `src/env.ts`. Inside that file, set the URL for your target JSON-RPC endpoint. For example:

```ts
export const RPC_URL = 'http://localhost:8545';
```

## Running the App

To run the Marketplace Explorer locally:

1. Clone this repository:

```bash
git clone https://github.com/golemfactory/marketplace-explorer.git
cd marketplace-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server, depending on your package manager:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

Make sure your backend is running and accessible at the configured RPC URL.

## Customizing

You generally don't need to fork or modify the source code to use this tool. Just update the `RPC_URL` in `src/env.ts` to point to your Golem backend, and you're good to go.

## Learn More

To learn more about Golem Network and Golem Base projects take a look to following resources:

- [Golem Base official site](https://golem-base.io) - learn more about Golem Base.
- [Golem Network Documentations](https://docs.golem.network) - API docs and tutorials about Golem Network - p2p network for sharing compute power.

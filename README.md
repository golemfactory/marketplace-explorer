# Golem Marketplace

The Golem Marketplace Explorer is a Next.js-based frontend for browsing real-time offers on the Golem Network. Each offer represents a set of available computing resources, such as CPU time, along with its corresponding price in GLM. This tool provides a live view of active providers on the network and can be especially useful for debugging, testing, or exploring local or custom Golem setups.


## Configuration

To configure the app, set the NEXT_PUBLIC_GOLEM_BASE_RPC_URL environment variable to the URL for your target JSON-RPC endpoint. The default is http://localhost:8545/.

## Running the App

To run the Marketplace Explorer locally:

1. Clone this repository:

```bash
git clone https://github.com/golemfactory/marketplace-explorer.git
cd marketplace-explorer
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun dev
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

Make sure your backend is running and accessible at the configured RPC URL.

## Learn More

To learn more about Golem Network and Golem Base projects take a look to following resources:

- [Golem Base official site](https://golem-base.io) - learn more about Golem Base.
- [Golem Network Documentations](https://docs.golem.network) - API docs and tutorials about Golem Network - p2p network for sharing compute power.

# Bridge Between Ethereum and GnoLand Networks

This project was developed during a Web3 camp with the goal of creating a bridge between the Ethereum and GnoLand networks, enabling the transfer of assets between these two blockchain networks.

## Backend Setup

### 1. Deploy the ETH Contract

To deploy your own Ethereum smart contract, use the following command:

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

This will deploy a new smart contract on the Sepolia network. If you prefer not to deploy your own contract, you can use our pre-deployed smart contract on the Ethereum network with the address `0x6F677442B0cb3E80B39090661a427cf1b1fA0c46` for testing.

### 2. Configure the `.env` File

Create a `.env` file in the root directory and set up your environment variables. You can use our example configuration from the `.env.example` file, or if you prefer, you can use our Ethereum smart contract mentioned above.

### 3. Install Node.js Packages

Install the required Node.js packages:

```bash
npm install
```

### 4. Install dotenv

`dotenv` allows you to manage environment variables from the `.env` file:

```bash
npm install dotenv
```

### 5. Install Hardhat

Install Hardhat, a development environment for Ethereum:

```bash
npm install hardhat
```

### 6. Run the Listener Script

Run the listener script on the Sepolia test network:

```bash
npx hardhat run ./scripts/listener.ts --network sepolia
```

## Frontend Setup

### 1. Install Node.js Packages

In the frontend root directory, install the necessary packages:

```bash
npm install
```

### 2. Run the Development Server

Start the development server:

```bash
npm run dev
```

## Contracts Setup

### 1. Deploy Contracts

Deploy two smart contracts: one on the Ethereum network and one on the GnoLand network. If you don't want to deploy your own GnoLand contract, you can use our pre-deployed smart contract with the address `g12x53uevj3plq8fpntp59nr7dvwu3a0gzw74n9f` for testing.

### 2. Check the Balance on the GnoLand Network

If you have deployed your own GnoLand contract, replace the address in the following command with yours. Otherwise, you can use our address:

```bash
gnokey query bank/balances/g12x53uevj3plq8fpntp59nr7dvwu3a0gzw74n9f --remote https://rpc.test4.gno.land:443
```

## Authors

This project was developed by:

- **Dragan Milošević**  
  [GitHub](https://github.com/Milosevic02) | [LinkedIn](https://www.linkedin.com/in/dragan-milosevic-ab405b280/)

- **Nemanja Matić**  
  [GitHub](https://github.com/Nemanya8) | [LinkedIn](https://www.linkedin.com/in/nemanjamatic/)

- **Amar Mujezinović**  
  [GitHub](https://github.com/amaramci) | [LinkedIn](https://www.linkedin.com/in/amar-mujezinovic/)

With great support and mentorship from:

- **Lav Leon Hudak**  
  [GitHub](https://github.com/leohhhn) | [LinkedIn](https://www.linkedin.com/in/leon-hudak/)
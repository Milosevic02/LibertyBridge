# Bridge Between Ethereum and GnoLand Networks

This project was developed during a Web3 camp with the goal of creating a bridge between the Ethereum and GnoLand networks, enabling the transfer of assets between these two blockchain networks.

**Link to the presentation:** [Google Slides Presentation](https://docs.google.com/presentation/d/1EOhX7evzmfzrT6Zbcnvr3jNX9tTJ98E6Bl-bggafD9Y/edit#slide=id.g115b257f0b0_1_15)

## Backend Setup

You can use our pre-deployed smart contract on the Ethereum network with the address `0x6F677442B0cb3E80B39090661a427cf1b1fA0c46` for testing. If you prefer to deploy your own contract, follow the steps below:

### 1. Configure the `.env` File

Create a `.env` file in the root directory and set up your environment variables. You can use our example configuration from the `.env.example` file, or if you prefer, you can use our Ethereum smart contract mentioned above.

### 2. Install Node.js Packages

Install the required Node.js packages:

```bash
npm install
```

### 3. Install dotenv

`dotenv` allows you to manage environment variables from the `.env` file:

```bash
npm install dotenv
```

### 4. Install Hardhat

Install Hardhat, a development environment for Ethereum:

```bash
npm install hardhat
```

### **Note:** If you are using our pre-deployed Ethereum smart contract for testing, you can skip steps 5 and 6 below.

### 5. Copy the `Bridge.sol` File (if deploying a new contract)

If you are deploying your own contract, create a folder named `contracts` within the `backend` directory and copy the `Bridge.sol` file into this folder.

### 6. Deploy the ETH Contract

To deploy your own Ethereum smart contract, use the following command:

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

This will deploy a new smart contract on the Sepolia network. If you prefer not to deploy your own contract, you can use our pre-deployed smart contract on the Ethereum network with the address `0x6F677442B0cb3E80B39090661a427cf1b1fA0c46` for testing.

### 7. Run the Listener Script

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

## Future Plans

We are planning to enhance the project with the following features:

- **Security Improvements**: Enhancing the overall security of the bridge to ensure safe and reliable transactions.
- **Development of a Custom Banker and EGRC20 Token**: We aim to create a custom banker that supports `uint256` for increased flexibility and compatibility with different token standards. Additionally, we will be developing an EGRC20 token with support for `uint256` to handle larger token amounts and provide improved functionality.
- **Bi-Directional Bridge**: Expanding the bridge to support transactions from GnoLand to Ethereum, enabling seamless two-way transfers between these platforms.
- **Fee Implementation**: Introducing transaction fees to cover operational costs and ensure the sustainability of the bridge.
- **Additional Features**: Exploring and implementing other features to improve the functionality and usability of the bridge.

## Challenges

1. **Integration with `uint256`**: Adapting the current system to work with `uint256` presents challenges, particularly in modifying the custom banker and token to handle this data type effectively.
2. **Security Risks**: Enhancing security while adding new features and functionalities requires careful planning to mitigate potential vulnerabilities and ensure safe transactions.
3. **Cross-Chain Compatibility**: Ensuring seamless bi-directional transfers between GnoLand and Ethereum involves addressing compatibility issues and maintaining consistent functionality across different blockchain platforms.
4. **Fee Structure**: Developing a fair and sustainable fee structure that covers operational costs without discouraging usage can be complex and needs careful consideration.
5. **Custom Token Development**: Creating a new EGRC20 token with `uint256` support involves additional development and testing to ensure compatibility and stability.

## Authors

This project was developed by:

- **Dragan Milošević**  
  [GitHub](https://github.com/Milosevic02) | [LinkedIn](https://www.linkedin.com/in/dragan-milosevic3/)

- **Nemanja Matić**  
  [GitHub](https://github.com/Nemanya8) | [LinkedIn](https://www.linkedin.com/in/nemanjamatic/)

- **Amar Mujezinović**  
  [GitHub](https://github.com/amaramci) | [LinkedIn](https://www.linkedin.com/in/amar-mujezinovic/)

import { ethers } from "ethers";
import * as dotenv from "dotenv";

const BRIDGE_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "by",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "gno_address",
          "type": "address"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "gno_addr",
          "type": "address"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "deposits",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "getDeposit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "index",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "release",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_URL);

    const bridgeContract = new ethers.Contract(process.env.BRIDGE_CONTRACT_ADDRESS, BRIDGE_ABI, provider);

    console.log(`Token address: ${await bridgeContract.token()}`);

    console.log(`Listening for Deposit events on ${process.env.BRIDGE_CONTRACT_ADDRESS}`);
    
    // Function to be called when Deposit event is emitted
    const handleDepositEvent = (by: string, amount: ethers.BigNumberish, gno_address: string) => {
        console.log(`Deposit event detected:`);
        console.log(`By: ${by}`);
        console.log(`Amount: ${ethers.formatUnits(amount, 18)}`);
        console.log(`GNO Address: ${gno_address}`);
    };

    bridgeContract.on("Deposit", handleDepositEvent);

    console.log("Press Ctrl+C to exit.");
    process.stdin.resume();
}

main().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});
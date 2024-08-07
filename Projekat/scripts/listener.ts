import { ethers } from "ethers";
import * as dotenv from "dotenv";
import * as abi from '../abi';

import { GnoWallet } from "@gnolang/gno-js-client";

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
  const mnemonic = 'upgrade disagree dilemma diagram tunnel connect glue finger insane heavy vintage stadium tuition pizza embark budget circle shop buddy joke walk intact soon illegal';
  const wallet = await GnoWallet.fromMnemonic(mnemonic);


  console.log(`Listening for Deposit events on ${process.env.BRIDGE_CONTRACT_ADDRESS}`);

  // Function to be called when Deposit event is emitted
  const handleDepositEvent = async (by: string, amount: ethers.BigNumberish, gno_address: string) => {
    console.log(`Deposit event detected:`);
    console.log(`By: ${by}`);
    console.log(`Amount: ${ethers.formatUnits(amount, 18)}`);
    console.log(`GNO Address: ${gno_address}`);
    amount = ethers.formatUnits(amount, 18);
    const txHash = await wallet.callMethod('gno.land/r/g15mzjefvj9pt2ctv30l9ju03rewmfv9hken9wfm/v1/bridge', 'Mint', [amount,gno_address],"https://rpc.test4.gno.land:443");
    console.log(`Transaction hash: ${txHash}`)
  };

  bridgeContract.on("Deposit", handleDepositEvent);

  console.log("Press Ctrl+C to exit.");
  process.stdin.resume();
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});


import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { Tx } from "@gnolang/tm2-js-client";
const { Wallet } = require('@gnolang/gno-js-client');
import * as BRIDGE_ABI from '../abi.json';


async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_URL);
  const bridgeContract = new ethers.Contract(process.env.BRIDGE_CONTRACT_ADDRESS, BRIDGE_ABI, provider);
  const mnemonic = 'upgrade disagree dilemma diagram tunnel connect glue finger insane heavy vintage stadium tuition pizza embark budget circle shop buddy joke walk intact soon illegal';
  const wallet = await Wallet.fromMnemonic(mnemonic);

  console.log(`Listening for Deposit events on ${process.env.BRIDGE_CONTRACT_ADDRESS}`);

  // Function to be called when Deposit event is emitted
  const handleDepositEvent = async (by: string, amount: ethers.BigNumberish, gno_address: string) => {
    console.log(`Deposit event detected:`);
    console.log(`By: ${by}`);
    console.log(`Amount: ${ethers.formatUnits(amount, 18)}`);
    console.log(`GNO Address: ${gno_address}`);
    await wallet.callMethod('gno.land/r/demo/foo20', 'TotalBalance', []);
    
  };

  bridgeContract.on("Deposit", handleDepositEvent);

  console.log("Press Ctrl+C to exit.");
  process.stdin.resume();
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});


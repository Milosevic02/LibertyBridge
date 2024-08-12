import { ethers } from 'ethers';
import { TxFee } from '@gnolang/tm2-js-client';
import Long from 'long';


import {
  GnoJSONRPCProvider,
  GnoWallet,
  GnoWSProvider,
} from '@gnolang/gno-js-client';
import { TransactionEndpoint } from '@gnolang/tm2-js-client/bin/provider/endpoints';
import { BRIDGE_ABI } from '../abi'; // Import the ABI

const test4RPC = 'https://rpc.test4.gno.land:443';
const localRPC = 'http://127.0.0.1:26657';

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_URL);
  const bridgeContract = new ethers.Contract(
    process.env.BRIDGE_CONTRACT_ADDRESS as string,
    BRIDGE_ABI,
    provider
  );

  const gnoProvider = new GnoJSONRPCProvider(test4RPC);

  const mnemonic = process.env.MNEMONIC;  // address derived from mnemonic: g1thgp4e56dw9fjkt9643luwk88zqwkeg5f2gjvm

  const wallet = await GnoWallet.fromMnemonic(mnemonic);
  wallet.connect(gnoProvider);



  const fee: TxFee = {
    gasWanted: new Long(1000000),
    gasFee: '100000ugnot',
  };



  console.log(
    `Listening for Deposit events on ${process.env.BRIDGE_CONTRACT_ADDRESS}`
  );

  const handleDepositEvent = async (
    by: string,
    amount: ethers.BigNumberish,
    gno_address: string
  ) => {

    //Ubaci cekanje blokova 32 je sigurno 64 sigurnije
    console.log(`Deposit event detected:`);
    console.log(`By: ${by}`);
    console.log(`Amount:${ethers.formatUnits(amount, 18)}`);
    console.log(`GNO Address: ${gno_address}`);
    const formattedAmount = amount.toString();

    const tx = await wallet.callMethod(
      'gno.land/r/g15mzjefvj9pt2ctv30l9ju03rewmfv9hken9wfm/v2/bridge',
      'Mint',
      [formattedAmount, gno_address],
      TransactionEndpoint.BROADCAST_TX_COMMIT,
      undefined,
      fee
    );

    console.log(tx.check_tx, tx.deliver_tx.ResponseBase.Events, tx.hash);
  };

  bridgeContract.on('Deposit', handleDepositEvent);

  console.log('Press Ctrl+C to exit.');
  process.stdin.resume();
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});

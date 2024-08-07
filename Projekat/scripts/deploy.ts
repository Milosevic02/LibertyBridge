import { ethers, network } from "hardhat";
import hre from "hardhat";
import {
  Bridge,
  Bridge__factory,
} from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
console.log(deployer)

  console.log(
    `ℹ️  Attempting to deploy the Bridge smart contract to the ${hre.network.name} blockchain using ${deployer.address} address`
  );

  const bridgeFactory: Bridge__factory = (await hre.ethers.getContractFactory(
    "Bridge"
  )) as Bridge__factory;

  const bridgeDeployer: Bridge = await bridgeFactory.connect(deployer).deploy(ethers.ZeroAddress);

  const Bridge = await bridgeDeployer.waitForDeployment();
  console.log("✅ Bridge:", await Bridge.getAddress());

  await new Promise((resolve) => setTimeout(resolve, 50000));

  try {
    await hre.run(`verify:verify`, {
      address: await Bridge.getAddress(),
      constructorArguments: [],
    });
  } catch (error) {
    console.log(
      `❌ Failed to verify the Bridge smart contract on Etherscan: ${error}`
    );

    console.log("✅ All smart contracts have been deployed successfully");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
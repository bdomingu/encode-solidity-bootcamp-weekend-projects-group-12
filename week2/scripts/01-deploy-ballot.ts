import { ethers, network } from "hardhat";
import verify from "../utils/verify";
import { Ballot__factory } from "../typechain-types";

async function main() {
  const developmentChains = ["hardhat", "localhost"];
  const proposals = process.argv.slice(2);

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
  // const wallet = new ethers.Wallet(
  //   "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
  // );
  const signer = wallet.connect(provider);
  console.log(`The Signer address is: ${signer.address}`);

  console.log("Following are the PROPOSALS for the BALLOT");
  console.log(">>>>>>");

  proposals.forEach((proposal, index) => {
    console.log(`Proposal ${index}: ${proposal}`);
  });

  console.log("------------------------------------------------------------");
  try {
    const ballotFactory = new Ballot__factory(signer);
    const ballotContract = await ballotFactory.deploy(
      proposals.map(ethers.utils.formatBytes32String)
    );
    const deployTx = await ballotContract.deployTransaction.wait();
    console.log("Deploying Ballot Contract");
    console.log("------------------------------------------------------------");

    console.log(
      `Ballot contract Deployed at: ${ballotContract.address} and the transaction hash is :${deployTx.transactionHash}`
    );
    const chairperson = await ballotContract.chairperson();
    console.log(`The current chairperson is : ${chairperson}`);
    if (
      !developmentChains.includes(network.name) &&
      process.env.ETHERSCAN_API_KEY
    ) {
      await verify(ballotContract.address, [
        "0x416c706861000000000000000000000000000000000000000000000000000000",
        "0x4265746100000000000000000000000000000000000000000000000000000000",
        "0x47616d6d61000000000000000000000000000000000000000000000000000000",
      ]);
    }
    console.log(
      "------------------------------------------------------------------"
    );
  } catch (err) {
    if (err instanceof Error) {
      // ✅ TypeScript knows err is Error
      console.log(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

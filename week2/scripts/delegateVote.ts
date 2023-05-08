import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";

import * as dotenv from "dotenv";
dotenv.config();
// import ABI from "../ABI";

async function main() {
  const delegateAddress = process.argv[3];
  const ballotAddress = process.argv[2];
  //   const voterAddress = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL
  );
  //   const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
  const signer = wallet.connect(provider);
  console.log(`The Signer address is: ${signer.address}`);
  try {
    const ballotFactory = new Ballot__factory(signer);
    const ballotContract = ballotFactory.attach(ballotAddress);
    console.log(`Got contract Ballot at ${ballotContract.address}`);
    console.log(`Delegating your voting rights to ${delegateAddress}`);
    console.log("------------------------------------------------------------");
    const transactionResponse = await ballotContract.delegate(delegateAddress);
    const transactionReceipt = await transactionResponse.wait();

    console.log(
      `Successfully delegate your voting rights to ${delegateAddress}! TxHash: ${transactionReceipt.transactionHash}`
    );
    const voterWeight = (await ballotContract.voters(signer.address)).weight;
    console.log(`Your voting weight is ${voterWeight}`);
    const delegateAddressWeight = (await ballotContract.voters(delegateAddress))
      .weight;
    console.log(`Your voting weight is ${delegateAddressWeight}`);
  } catch (err) {
    if (err instanceof Error) {
      // ✅ TypeScript knows err is Error
      console.log(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

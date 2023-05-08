import { ethers } from "hardhat";

async function main() {
  const voterAddress = process.argv[3];
  const ballotAddress = process.argv[2];
  try {
    const ballotContract = await ethers.getContractAt("Ballot", ballotAddress);
    console.log(`Got contract Ballot at ${ballotContract.address}`);
    console.log(`Giving Voting rights to ${voterAddress}`);
    console.log("------------------------------------------------------------");
    const transactionResponse = await ballotContract.giveRightToVote(
      voterAddress
    );
    const transactionReceipt = await transactionResponse.wait();
    console.log(
      `The address ${voterAddress} now have right to vote and TxHash: ${transactionReceipt.transactionHash}`
    );
    const voterWeight = (await ballotContract.voters(voterAddress)).weight;
    console.log(`Your voting weight is ${voterWeight}`);
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

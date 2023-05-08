import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";

async function main() {
  const ballotAddress = process.argv[2];
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
    const winningProposalNumber = await ballotContract.winningProposal();

    const winningProposal = await ballotContract.proposals(
      winningProposalNumber
    );
    const winningProposalVoteCount = winningProposal.voteCount;
    const winnerName = await ballotContract.winnerName();
    // console.log(`The winning proposal number is: ${winningProposal.toString()}`);
    console.log(
      `The winning proposal so far is ${ethers.utils.parseBytes32String(
        winnerName
      )} with ${winningProposalVoteCount} votes`
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

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

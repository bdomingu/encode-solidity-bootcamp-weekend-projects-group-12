import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";

async function main() {
  const ballotAddress = process.argv[2];
  const proposalNumber = process.argv[3];
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL
  );
  //   const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
  const signer = wallet.connect(provider);
  console.log(`The Signer address is: ${signer.address}`);

  const ballotFactory = new Ballot__factory(signer);
  const ballotContract = ballotFactory.attach(ballotAddress);
  console.log(`Got contract Ballot at: ${ballotContract.address}`);
  console.log(`Voting from address: ${signer.address}`);
  try {
    const proposal1 = await ballotContract.proposals(proposalNumber);
    console.log(
      `Proposal Name: ${ethers.utils.parseBytes32String(proposal1.name)}`
    );
    console.log(`Proposal Vote Count: ${proposal1.voteCount.toString()}`);
    //   const signer1ConnectedAccount = await ballotContract.connect(signer1);
    const transactionResponse = await ballotContract.vote(proposalNumber);
    const transactionReceipt = await transactionResponse.wait();
    const proposal0Updated = await ballotContract.proposals(proposalNumber);
    console.log(
      `Voted successfully for: ${ethers.utils.parseBytes32String(
        proposal0Updated.name
      )} and TxHash: ${transactionReceipt.transactionHash}`
    );
    console.log(
      `Updated proposal Vote Count: ${proposal0Updated.voteCount.toString()}`
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
// ["0x416c706861000000000000000000000000000000000000000000000000000000", "0x4265746100000000000000000000000000000000000000000000000000000000", "0x47616d6d61000000000000000000000000000000000000000000000000000000"]

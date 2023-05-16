import { ethers, network } from "hardhat"
import { TokenizedBallot__factory } from "../typechain-types"

const developmentChains = ["hardhat", "localhost"]

// script to add flags
interface Flags {
  tokenizedContractAddress: string | null
  proposalNumber: string | null
  voteAmount: string | null
}

function parseArgs(): Flags {
  const args: string[] = process.argv.slice(2) // Remove first two elements

  const flags: Flags = {
    tokenizedContractAddress: null,
    proposalNumber: null,
    voteAmount: null,
  }

  for (let i = 0; i < args.length; i++) {
    const arg: string = args[i]
    if (arg.startsWith("--")) {
      const flag: keyof Flags = arg.slice(2) as keyof Flags // Type assertion
      const value: string | undefined = args[i + 1] // Get the value of the flag

      if (flag in flags) {
        flags[flag] = value || null // Assign value or null if value is undefined
      } else {
        console.log(`Unknown flag: ${flag}`)
      }
    }
  }

  return flags
}

async function main() {
  const parsedArgs: Flags = parseArgs()

  let signer

  // getting the signer for sepolia or localhost
  if (!developmentChains.includes(network.name)) {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.SEPOLIA_RPC_URL
    )
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!)
    signer = wallet.connect(provider)
    console.log(`The Signer address is: ${signer.address}`)
  } else {
    const accounts = await ethers.getSigners()
    const signerLocal = accounts[0]
    console.log(`The Signer address is: ${signerLocal.address}`)
    signer = signerLocal
  }

  // pulling the votesContractAddress, proposal number and vote amount from flags
  const tokenizedBallotContract = new TokenizedBallot__factory(signer)
  const votesTokenContract = await tokenizedBallotContract.attach(
    parsedArgs.tokenizedContractAddress!
  )

  try {
    const votesFromAccount1 = await votesTokenContract
      .connect(signer)
      .vote(
        parsedArgs.proposalNumber!,
        ethers.utils.parseEther(parsedArgs.voteAmount!)
      )
    console.log(
      "\n========================== Voting in Progress ==========================\n"
    )
    const votesFromAccount1Tx = await votesFromAccount1.wait()
    console.log(
      `Successfully voted for proposal no.: ${parsedArgs.proposalNumber} \nThe transaction hash is: ${votesFromAccount1Tx.transactionHash}`
    )
  } catch (err) {
    if (err instanceof Error) {
      // ✅ TypeScript knows err is Error
      console.log(err.message)
    } else {
      console.log("Unexpected error", err)
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

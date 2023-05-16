import { ethers, network } from "hardhat"
import { MyERC20Votes__factory } from "../typechain-types"

const developmentChains = ["hardhat", "localhost"]

// script to add flags
interface Flags {
  votesContractAddress: string | null
  delegateAddress: string | null
}

function parseArgs(): Flags {
  const args: string[] = process.argv.slice(2) // Remove first two elements

  const flags: Flags = {
    votesContractAddress: null,
    delegateAddress: null,
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

  // pulling the votesContractAddress, delegateAddress from flags
  const contractFactory = new MyERC20Votes__factory(signer)
  const votesTokenContract = await contractFactory.attach(
    parsedArgs.votesContractAddress!
  )

  // Querying the balance of delegate address
  console.log(
    "\n========================== Your MyVoteToken Balance ==========================\n"
  )
  const balanceBN = await votesTokenContract.balanceOf(
    parsedArgs.delegateAddress!
  )
  console.log(
    `Account: ${parsedArgs.delegateAddress!} has ${ethers.utils.formatEther(
      balanceBN
    )} number of Tokens\n`
  )

  // const votes = await votesTokenContract.getVotes(parsedArgs.delegateAddress!)
  // console.log(
  //   `Account: ${parsedArgs.delegateAddress!} has ${ethers.utils.formatEther(
  //     votes
  //   )} voting power before delegating\n`
  // )

  // delegating to the delegateAddress
  const delegateTx = await votesTokenContract
    .connect(signer)
    .delegate(parsedArgs.delegateAddress!)
  console.log(
    "\n========================== Delegating Votes ==========================\n"
  )
  await delegateTx.wait()
  const votesAfter = await votesTokenContract.getVotes(
    parsedArgs.delegateAddress!
  )
  console.log(
    "\n========================== Your Voting Power ==========================\n"
  )
  console.log(
    `Account: ${parsedArgs.delegateAddress!} has ${ethers.utils.formatEther(
      votesAfter
    )} voting power after delegating\n`
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

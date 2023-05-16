import { ethers, network } from "hardhat"
import { MyERC20Votes__factory } from "../typechain-types"

const developmentChains = ["hardhat", "localhost"]

// script to add flags
interface Flags {
  votesContractAddress: string | null
  minterAddress: string | null
  mintAmount: string | null
}

function parseArgs(): Flags {
  const args: string[] = process.argv.slice(2) // Remove first two elements

  const flags: Flags = {
    votesContractAddress: null,
    minterAddress: null,
    mintAmount: null,
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

  // pulling the MyErc20Votes address, minterAddress and amount from flags
  let myERC20VotesAddress = parsedArgs.votesContractAddress
  const minterAddress = parsedArgs.minterAddress
  const contractFactory = new MyERC20Votes__factory(signer)
  const votesTokenContract = await contractFactory.attach(myERC20VotesAddress!)

  // minting tokens to the minterAddress
  console.log(
    "\n========================== Minting MyVoteToken ==========================\n"
  )
  const mintTx = await votesTokenContract.mint(
    minterAddress!,
    ethers.utils.parseEther(parsedArgs.mintAmount!)
  )
  const mintTxReceipt = await mintTx.wait()
  console.log(
    `Minted ${ethers.utils.formatEther(
      ethers.utils.parseEther(parsedArgs.mintAmount!)
    )} tokens to the address ${minterAddress} \nTransaction Hash is: ${
      mintTxReceipt.transactionHash
    } at block ${mintTxReceipt.blockNumber}\n `
  )

  // Querying the balance to check if the tokens are minted
  console.log(
    "\n========================== Your MyVoteToken Balance ==========================\n"
  )
  const balanceBN = await votesTokenContract.balanceOf(minterAddress!)
  console.log(
    `Account: ${minterAddress} has ${ethers.utils.formatEther(
      balanceBN
    )} number of Tokens\n`
  )

  console.log(
    "\n========================== Your Voting Power ==========================\n"
  )
  const votes = await votesTokenContract.getVotes(minterAddress!)
  if (ethers.utils.formatEther(votes) === "0.0") {
    console.log(
      `Account: ${minterAddress} has ${ethers.utils.formatEther(
        votes
      )} voting power. Please delegate token to desired address to give Voting Power`
    )
  } else {
    console.log(
      `Account: ${minterAddress} has ${ethers.utils.formatEther(
        votes
      )} voting power!\n`
    )
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

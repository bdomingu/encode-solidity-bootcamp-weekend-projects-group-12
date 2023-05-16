import { ethers, network } from "hardhat"
import { TokenizedBallot__factory } from "../typechain-types"

const developmentChains = ["hardhat", "localhost"]

const votesContractAddress = process.argv[2]

const proposals = process.argv.slice(3)
// const proposals = ["Alpha", "Beta", "Gamma"]

async function main() {
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

  // deploying Tokenized ballot and pulling the votesContractAddress and proposals
  console.log("Following are the PROPOSALS for the Tokenized BALLOT")
  console.log(">>>>>>")

  proposals.forEach((proposal, index) => {
    console.log(`Proposal ${index}: ${proposal}`)
  })
  const tokenizedBallotFactory = new TokenizedBallot__factory(signer)
  const tokenizedBallotContract = await tokenizedBallotFactory.deploy(
    proposals.map(ethers.utils.formatBytes32String),
    votesContractAddress
  )
  console.log(
    "\n========================== Deploying TokenizedBallot Contract ==========================\n"
  )
  const deployTvTx = await tokenizedBallotContract.deployTransaction.wait()
  console.log(
    `Tokenized Ballot contract Deployed at: ${tokenizedBallotContract.address} \nand the transaction hash is :${deployTvTx.transactionHash} at block: ${deployTvTx.blockNumber}`
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

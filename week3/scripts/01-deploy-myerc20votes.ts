import { ethers, network } from "hardhat"
import { MyERC20Votes__factory } from "../typechain-types"

const developmentChains = ["hardhat", "localhost"]

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

  // deploying MyTokenVote
  const contractFactory = new MyERC20Votes__factory(signer)
  const contract = await contractFactory.deploy()
  const receipt = await contract.deployTransaction.wait()
  console.log(
    "\n========================== Deploying MyVoteToken ==========================\n"
  )
  console.log(
    `The MyERC20Votes is deployed at: ${contract.address} \nand the Tx Hash is: ${receipt.transactionHash}\n`
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

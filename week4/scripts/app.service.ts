import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenJson from './assets/MyERC20Token.json';
import * as ballotJson from './assets/TokenizedBallot.json';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider;
  contract: ethers.Contract;
  tokenizedContract: ethers.Contract;

  constructor(private configService: ConfigService) {
    this.provider = new ethers.providers.JsonRpcProvider(
      this.configService.get<string>('SEPOLIA_RPC_URL'),
    );
    this.contract = new ethers.Contract(
      this.getAddress('TOKEN_ADDRESS'),
      tokenJson.abi,
      this.provider,
    );
    this.tokenizedContract = new ethers.Contract(
      this.getAddress('TOKENIZED_CONTRACT_ADDRESS'),
      ballotJson.abi, // <-- Use ballotJson.abi instead of tokenJson.abi
      this.provider,
    );
  }

  // get contract-address
  getAddress(configKey: string): string {
    const contractAddress = this.configService.get<string>(configKey);
    return contractAddress;
  }

  // get token balance of an address
  getBalanceOf(address: string) {
    return this.contract.balanceOf(address);
  }

  // get voting-power of an address after delegation
  getVotingPower(address: string) {
    return this.tokenizedContract.votingPower(address);
  }

  // address with minter-role can request/mint tokens
  async requestTokens(address: string) {
    const pKey = this.configService.get<string>('PRIVATE_KEY');
    const wallet = new ethers.Wallet(pKey);
    const signer = wallet.connect(this.provider);
    return this.contract
      .connect(signer)
      .mint(address, ethers.utils.parseUnits('100'));
  }

  // get current votes for an address
  async getVotes(address: string) {
    const pKey = this.configService.get<string>('PRIVATE_KEY');
    const wallet = new ethers.Wallet(pKey);
    const signer = wallet.connect(this.provider);
    return this.contract.connect(signer).getVotes(address);
  }

  async getBalance(address: string) {
    const pKey = this.configService.get<string>('PRIVATE_KEY');
    const wallet = new ethers.Wallet(pKey);
    const signer = wallet.connect(this.provider);
    return this.tokenizedContract.connect(signer).balanceOf(address);
  }

  // Get-proposal by index number
  async getProposals(proposal: number) {
    const response = await this.tokenizedContract.proposals(proposal);
    const name = response[0];
    const voteCount = response[1].toString();

    return { name, voteCount };
  }

  // Extra routes from the Week 4 lecture
  getHello(): string {
    return 'Hello World!';
  }

  getLastBlock() {
    return this.provider.getBlock('latest');
  }

  getTotalSupply() {
    return this.contract.totalSupply();
  }

  async getTransactionReceipt(hash: string) {
    const tx = await this.provider.getTransaction(hash);
    const receipt = await this.getReceipt(tx);
    return receipt;
  }

  async getReceipt(tx: ethers.providers.TransactionResponse) {
    return await tx.wait();
  }

  // The delegate and vote functions are handled in the frontend.

  // async delegateTokens(signedTx: string) {
  //   const tx = await this.provider.sendTransaction(signedTx);
  //   return tx;
  // }

  // async vote(proposal: number, amount: string, request: Request) {
  //   const signer = await this.getInjectedSigner(request);
  //   return this.tokenizedContract
  //     .connect(signer)
  //     .vote(proposal, ethers.utils.parseEther(amount));
  // }
}

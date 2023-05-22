import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestTokensDto } from './dtos/requestTokens.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // get contract-address
  @Get('address/:configKey')
  getAddress(@Param('configKey') configKey: string) {
    return this.appService.getAddress(configKey);
  }

  // get token balance of an address
  @Get('balance/:address')
  getBalanceOf(@Param('address') address: string) {
    return this.appService.getBalanceOf(address);
  }

  // get voting-power of an address after delegation
  @Get('voting-power/:address')
  getVotingPower(@Param('address') address: string) {
    return this.appService.getVotingPower(address);
  }

  // address with minter-role can request/mint tokens
  @Post('request-tokens')
  requestTokens(@Body() body: RequestTokensDto) {
    return this.appService.requestTokens(body.address);
  }

  // get current votes for an address
  @Get('votes/:address')
  async getVotes(@Param('address') address: string) {
    return this.appService.getVotes(address);
  }

  @Get('balance/:address')
  async getBalance(@Param('address') address: string) {
    return this.appService.getBalance(address);
  }

  // Get-proposal by index number
  @Get('proposals/:proposal')
  async getProposals(@Param('proposal') proposal: number) {
    return this.appService.getProposals(proposal);
  }

  // Extra routes from the Week 4 lecture
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('last-block')
  getLastBlock() {
    return this.appService.getLastBlock();
  }

  @Get('total-supply')
  getTotalSupply() {
    return this.appService.getTotalSupply();
  }

  @Get('transaction-receipt/')
  async getTransactionReceipt(@Query('hash') hash: string) {
    return await this.appService.getTransactionReceipt(hash);
  }

  // The delegate and vote functions are handled in the frontend.

  // @Post('delegate-tokens')
  // async delegateTokens(@Body() body: DelegateTokensDto) {
  //   const { signedTx } = body;

  //   try {
  //     const result = await this.appService.delegateTokens(signedTx);
  //     return { success: true, result };
  //   } catch (error) {
  //     return { success: false, error: error.message };
  //   }
  // }
}

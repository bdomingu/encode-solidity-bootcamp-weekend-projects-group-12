# Group 12

### _Contributors_

- Jonathan Meyer | mwjeth#7039
- Andy | 0xAndy#3968
- Beatriz Dominguez | BeatrizD#8939
- Anuja | anud#1704
- Pedro | pdroooooooo#5705
- BK | BK#7471
- Neeraj | innerpeace#5319

---

### Ballot Contract Report

#### The ballot contract is deployed on Sepolia Testnet and the address is: `0x66eb0E81E85952816f4e629a929ce3D5f2B36fDB`

#### Vote for the fav coffee proposals

- Proposal 0 - Dunkin
- Proposal 1 - Starbucks
- Proposal 2 - Tims
- Proposal 3 - Peet

---

- **Deployed Contract Transaction**
  > [hash](https://sepolia.etherscan.io/tx/0x41e112ad41c0909c7fc58fe7f3896bf1be679094d631c8a977d45b42b6fc02ae)`0x41e112ad41c0909c7fc58fe7f3896bf1be679094d631c8a977d45b42b6fc02ae`
- **successful `giveRightToVote` to `0x44C114C8a23628789FC5a133e7777C48e2c783c5`**
  > [hash](https://sepolia.etherscan.io/tx/0xe11e63dddff3ade694eeb6e03b030ddfe5bba1047466b02fb0181f27c13a92c1)`0xe11e63dddff3ade694eeb6e03b030ddfe5bba1047466b02fb0181f27c13a92c1`
  - > Etherscan img ![giveRightToVoteEtherscan](./images/giveRightToVote-Successful-BettyAddress-Etherscan.png)
- **unsuccessful `vote` from `0xF6d38b257b4DD900BABe5B0f48A877943C0f1312` because of no permission to vote**
  - > ![noRightToVoteError](./images/NoRightToVoteError.png)
  - > ![etherscan](./images/NoRightToVoteErrorEtherscan.png)
- **successful `vote` from `0xF6d38b257b4DD900BABe5B0f48A877943C0f1312`**
  > [hash](https://sepolia.etherscan.io/tx/0xe2f3ab681cb5502380e2993cbafa719438e2467ec1dd1bde292f4b4e4b8e8bbb)`0xe2f3ab681cb5502380e2993cbafa719438e2467ec1dd1bde292f4b4e4b8e8bbb`
  - > ![voteSuccessScript](./images/voteTxSuccessful.png)
  - > ![voteSuccessScriptEtherscan](./images/voteTxSuccessfulEtherscan.png)
- **succesful `vote` from `0x44C114C8a23628789FC5a133e7777C48e2c783c5`**
   > [hash] 
  - > ![voteSuccessScript](./images/voteTx2Succesful.png)
  - > ![voteSuccessScriptEtherscan](./images/voteTx2SuccesfulEtherscan.png)
- **winning proposal script**
  - > ![winningProposals](./images/winningProposalScriptQuery.png)
  - (./images/winningProposal.png)


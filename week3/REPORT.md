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

### TokenizedBallot Contract Report [Github Repo](https://github.com/bdomingu/Encode-Week-Three-Project)

#### The MyERC20Votes contract is deployed on Sepolia Testnet and the address is: [`0x1734E67eE6c21f2Ff59CC9F9B209f798f2448862`](https://sepolia.etherscan.io/address/0x1734e67ee6c21f2ff59cc9f9b209f798f2448862)
#### The Tokenized Ballot contract is deployed on Sepolia Testnet and the address is: [`0xBEd8efAbfB986EF7b791CDE1694FC1EB56db0DFc`](https://sepolia.etherscan.io/address/0xbed8efabfb986ef7b791cde1694fc1eb56db0dfc)

#### Vote for your favorite food chain:

- Proposal 0 - Wendys
- Proposal 1 - Starbucks
- Proposal 2 - McDonalds
- Proposal 3 - KFC
- Proposal 4 - Dunkin

---
- **The MyERC20Votes contract was deployed first. You can find the transaction below.**
  > [`0xaf712b90b0bb4b5b61dbceebfefad5c6dc3a9ebe714fc4c46cfaf74a6eed94a7`](https://sepolia.etherscan.io/tx/0xaf712b90b0bb4b5b61dbceebfefad5c6dc3a9ebe714fc4c46cfaf74a6eed94a7)
- **BK deployed the MyERC20Votes contract and was assigned the minter role. He minted 100 Tokens to all of our team members' accounts and to his account. You can find all the minting transactions below.
  > [`0x2f77ea463b7f6da99ba66ab21c16cc704c9dc8b8a75bbc453194ddb5aa5a7eec`](https://sepolia.etherscan.io/tx/0x2f77ea463b7f6da99ba66ab21c16cc704c9dc8b8a75bbc453194ddb5aa5a7eec)
  > [`0xef5c7e28316105ce8de6d0bbc1d99b3603df8de6e88851f7670c0102a2dcba9d`](https://sepolia.etherscan.io/tx/0xef5c7e28316105ce8de6d0bbc1d99b3603df8de6e88851f7670c0102a2dcba9d)
  > [`0x22dded3c62d274955d3801283446dfa6ae97563386be10b9afb396bbf7cdaa32`](https://sepolia.etherscan.io/tx/0x22dded3c62d274955d3801283446dfa6ae97563386be10b9afb396bbf7cdaa32)
  > [`0x7163700bf98d333d6d528fd60908d967314fc6a3964245c57137005aa6c161e0`](https://sepolia.etherscan.io/tx/0x7163700bf98d333d6d528fd60908d967314fc6a3964245c57137005aa6c161e0)
  > [`0x36b79bc194d99a79873e9eb48ad2f784029290b5b32ff5dab615b57a253d4534`](https://sepolia.etherscan.io/tx/0x36b79bc194d99a79873e9eb48ad2f784029290b5b32ff5dab615b57a253d4534)
  > [`0x56e9c1d0102aabf70739f237bdccde82fb5ddd72552c474a69d826d673ae7c6b`](https://sepolia.etherscan.io/tx/0x56e9c1d0102aabf70739f237bdccde82fb5ddd72552c474a69d826d673ae7c6b)
- **The transaction below was reverted since Neeraj was not assigned as the minter role and therefore he was unable to mint tokens for his account.**
  > [`0x4da93899c8a6febb77b9f6b31e6328c905f414528c4bb9e5b3c05bc911538d3d`](https://sepolia.etherscan.io/tx/0x4da93899c8a6febb77b9f6b31e6328c905f414528c4bb9e5b3c05bc911538d3d)
  - > Etherscan img ![revertMintEtherscan](./images/revertedMint.png)
- **This past week we learned that owning an amount of tokens does not give you voting rights. In order to get voting rights, you must delegate those tokens to yourself. After we acquired the 100 Tokens, we delegated them to ourselves. You can find the delegate transactions below.**
  > [`0x686bef2a3b042f65464bc15cdfbb459c0fb890be4980a69515fced992a1a41f0`](https://sepolia.etherscan.io/tx/0x686bef2a3b042f65464bc15cdfbb459c0fb890be4980a69515fced992a1a41f0)
  > [`0x6c16ae63429f7bee802b6991776072f80c230c272ce35afe593f53109ae62ea3`](https://sepolia.etherscan.io/tx/0x6c16ae63429f7bee802b6991776072f80c230c272ce35afe593f53109ae62ea3)
  > [`0xfa482eac162670f21dd6dfabc8bde5eb8ffa12dc827dd7f78cbacd85219d283d`](https://sepolia.etherscan.io/tx/0xfa482eac162670f21dd6dfabc8bde5eb8ffa12dc827dd7f78cbacd85219d283d)
  > [`0x58d4afdbc5a286ac7f41168463a268547b45fc47999b9149256e796fb5e15c1b`](https://sepolia.etherscan.io/tx/0x58d4afdbc5a286ac7f41168463a268547b45fc47999b9149256e796fb5e15c1b)
  > [`0x52ba2e021907ac200e3a6c383623fc86792b0780313f4d85532679028efc03ca`](https://sepolia.etherscan.io/tx/0x52ba2e021907ac200e3a6c383623fc86792b0780313f4d85532679028efc03ca)
- **After the minting and delegating, Neeraj deployed the Tokenized Ballot contract. You can find the deployment transaction below.**
  > [`0xd1add9a228fa2d82f590a0dc8cd4834c07b2de0ae84755e34168bff993e6484c`](https://sepolia.etherscan.io/tx/0xd1add9a228fa2d82f590a0dc8cd4834c07b2de0ae84755e34168bff993e6484c)

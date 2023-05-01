# Group 12

### _Contributors_

- Jonathan Meyer | mwjeth#7039
- Andy
- Betty
- Anuja
- Pedro
- BK
- Neeraj | innerpeace#5319

---

### HelloWorld Contract Report

- **Deployed Contract Transaction**
  > [hash:](https://goerli.etherscan.io/tx/0xcfbe0c2a3ab01f119e9620e469e70cc971b4e912000bc5a1c218556fdaa65abb)`0xcfbe0c2a3ab01f119e9620e469e70cc971b4e912000bc5a1c218556fdaa65abb`
- **successful `setText()` by `owner`**
  > [hash:](https://goerli.etherscan.io/tx/0x8635b98dcefd1b4958cde96b3d60b399bc2f930fa9d9e127bf226baece42c23a) `0x8635b98dcefd1b4958cde96b3d60b399bc2f930fa9d9e127bf226baece42c23a`
- **Not owner `setText()` reverted**
  > [hash:](https://goerli.etherscan.io/tx/0xda3f375c81c4554f140c754d0e8b1e670384f0a32081a910e9b1c87caa646a3e) > `0xda3f375c81c4554f140c754d0e8b1e670384f0a32081a910e9b1c87caa646a3e`
  - > Not owner `Remix` warning ![RevertedTxIMG](./images/NotOwnerRemixWarning.png)
  - > Reverted Tx on Goerli Testnet ![GoerliReverted](./images/NotOwnerRevertedByNetwork.png)
- **TransferOwnerShip to address:`0xF6d38b257b4DD900BABe5B0f48A877943C0f1312`**
  > [hash:](https://goerli.etherscan.io/tx/0x3e25e346779b291b4f23098aeef7feefb4ff18209937b93552b223c636b7cb63) > `0x3e25e346779b291b4f23098aeef7feefb4ff18209937b93552b223c636b7cb63`
  - > ![TransferOwnership](./images/transferOwnership1312.png)
- **New Owner `setText()` successful**
  > [hash:](https://goerli.etherscan.io/tx/0x86c8e15832b9715caea3aea91a88e5ced22ff6fd4c7836587cce469a8b30356f) > `0x86c8e15832b9715caea3aea91a88e5ced22ff6fd4c7836587cce469a8b30356f`
  - > ![1312setTextSuccess](./images/1312setTextSuccessful.png)
- **Not Owner `transferOwnership()` reverted**
  - > [hash:](https://goerli.etherscan.io/tx/0xf0bb4d0d4f1c9a77d9d85ea117e3b732c055be11e140a7aab578c3d143a28785) > `0xf0bb4d0d4f1c9a77d9d85ea117e3b732c055be11e140a7aab578c3d143a28785`
  - > ![notOwnerTranferownerReverted](./images/nonOwnerTransferOwnershipReverted.png)
- [**All Transactions**](https://goerli.etherscan.io/address/0x69dbc5c0d3d798cd32a3e521b981f969188f3ecf)
---

### Conclusion

    The contract

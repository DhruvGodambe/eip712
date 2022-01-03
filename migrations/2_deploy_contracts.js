// const { default: getWeb3 } = require("../client/src/getWeb3");

var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var EIP712 = artifacts.require("./EIP712.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(EIP712);
  
  // privateKey = "28346265d8cd52e65a86cb8ecc1e34a769115c4da29e5f666753529fab7f60f6";
  // tx = web3.eth.accounts.signTransaction({
  //   from: "0x4E597e45Ec1Ddb18818A48B9a99aea998F363114",
  //   to: "0x7bBD77cd941426D77ddaA623Bc9b1F6f0a07db42",
  //   gas: web3.utils.toWei("1", "ether"),
  //   value: web3.utils.toWei("1", "ether")
  // }, privateKey, function(err, result) {
  //   console.log(result)
  // })

  // console.log(tx);
};

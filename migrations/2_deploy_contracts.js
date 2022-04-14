// const { default: getWeb3 } = require("../client/src/getWeb3");

var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var EIP712 = artifacts.require("./EIP712.sol");

module.exports = async function(deployer, network, accounts) {
  // privateKey = "8e7f608bee8ac32393723a58817674ee99ae2e77a7dd580014021db9193aa90f";
  // fromAddr = "0x92d591c8B6e95ffb6f715328dbF286dAF52A387B";
  // tx = web3.eth.accounts.signTransaction({
  //   // from: fromAddr,
  //   to: "0x7bBD77cd941426D77ddaA623Bc9b1F6f0a07db42",
  //   gas: "3000000",
  //   // chain: 1337,
  //   // hardfork: "MUIRGLACIER",
  //   value: web3.utils.toWei("1", "ether"),
  //   data: ""
  // }, privateKey, function(err, result) {
  //   console.log(err, result)
  // })

  // console.log(tx);

  deployer.deploy(SimpleStorage);
  deployer.deploy(EIP712);
  
  const instance = await EIP712.deployed();
  // console.log(await instance.messageHash());

  newR = "0xe491b41d9df8fde80979ce9a298338db4b7ee2c40c45eeee1c374d0ebb7654eb";
  newS = "0x29f76fbf23e88500ce05f4374e0ebbf7289fd2097f5c2cc9ba257f2dec8fd2ef";
  newV = 27;

  oldR = "0x2a676284f983c2de77ddbc4916ea771b840bff8a34901e557272028fbf1dd3ff"
  oldS = "0x67d2342cc23383793a7e9b2d1c155d3a01f0e19eb7020b790780d5a4f39542e9"
  oldV = 28

  console.log(await instance.verify(
    "0x7bBD77cd941426D77ddaA623Bc9b1F6f0a07db42",
    newR,
    newS,
    newV,
    {from: accounts[1]}
  )
  );
};

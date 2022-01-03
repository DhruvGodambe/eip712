import React, { Component } from "react";
import EIP712Contract from "./contracts/EIP712.json";
import getWeb3 from "./getWeb3";
import Web3 from "web3";
import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };
  dataStruct = {
    message: "I acknowledge blah blah blah"
  }

  domainSeparator = {
    name: "EIP712",
    version: "2.2",
    chainId: 1337,
    verifyingContract: "0x7bBD77cd941426D77ddaA623Bc9b1F6f0a07db42",
    salt: "0xf2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a558"
  }

  // code signing
  domain = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
    { name: "salt", type: "bytes32" },
  ];

  dS = [
    { name: "message", type: "string"}
  ];

  data = JSON.stringify({
    types: {
      EIP712Domain: this.domain
    },
    domain: this.domainSeparator,
    primaryType: "EIP712Domain",
    message: this.dataStruct
  })

  signMessage = async (web3, w) => {
    const networkId = await web3.eth.net.getId();
    web3.currentProvider.sendAsync(
      {
          method: "eth_signTypedData_v3",
          params: [w[0], this.data],
          from: w[0]
      },
      async function(err, result) {
          if (err) {
              return console.log(err.code);
          }
          const signature = result.result.substring(2);
          const r = "0x" + signature.substring(0, 64);
          const s = "0x" + signature.substring(64, 128);
          const v = parseInt(signature.substring(128, 130), 16);
          // The signature is now comprised of r, s, and v.
          console.log(signature)
          console.log("r: ", r)
          console.log("s: ", s)
          console.log("v: ", v)
          // Get the contract instance.
          const deployedNetwork = EIP712Contract.networks[networkId];
          const instance = new web3.eth.Contract(
            EIP712Contract.abi,
            deployedNetwork && deployedNetwork.address,
            );
            console.log(await instance.methods.verify(w[0], r, s, v).call());
        }
      );

  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      // const web3 = await getWeb3();
      let web3;
      if(window.ethereum){
        web3 = new Web3(window.ethereum);
        console.log(web3.utils.hexToNumber(web3.currentProvider.chainId));
        let w = await window.ethereum.enable(); 
        console.log(w);
        await this.signMessage(web3, w);
        // const tx = await web3.eth.sendTransaction({
        //   from: w[0],
        //   to: "0x34Dc3fd353a77Eaef9832f759611a0024fEf2069",
        //   value: web3.utils.toWei("0.1", "ether"),
        //   gas: "30000"
        // })
        // console.log(tx);
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        this.setState({ web3, accounts }
          // , this.runExample
          );
      }
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;

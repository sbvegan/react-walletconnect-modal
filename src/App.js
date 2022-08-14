import { useState } from "react";
import './App.css';
import Web3Modal from "web3modal";
import { providerOptions } from "./providerOptions";
import { ethers } from "ethers";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});

function App() {
  // web3 state
  const [provider, setProvider] = useState()
  const [library, setLibrary] = useState()
  const [account, setAccount] = useState()
  const [network, setNetwork] = useState()
  const [chainId, setChainId] = useState()
  const [error, setError] = useState()

  const connectWallet = async () => {
    try {
      // connect to provider and ethersjs library
      const provider = await web3Modal.connect()
      const library = new ethers.providers.Web3Provider(provider)
      const accounts = await library.listAccounts()
      const network = await library.getNetwork()
      // update state
      setProvider(provider)
      setLibrary(library)
      if (accounts) setAccount(accounts[0])
      setNetwork(network)
      setChainId(network.chainId);
    } catch (error) {
      setError(error)
    }
  }


  return (
    <div className="App">
      <header>
        <h1>
          React Walletconnect Modal
        </h1>
        {!account ?
          <button onClick={connectWallet}>Connect Wallet</button>
          :
          ""
        }
        <br/>
        <text>Account: {!account ? "": account}</text>
        <br/>
        <text>Network: {!account ? "" : network.name}</text>      
      </header>
    </div>
  );
}

export default App;

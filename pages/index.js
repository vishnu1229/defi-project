import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { MarketAddress, MarketAddressABI } from '@/context/address';
import Router from 'next/router';

const inter = Inter({ subsets: ['latin'] })
const router = Router;

export default function Home() {
  const [temp, settemp] = useState(0)
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    // Connect to Ethereum network
    const provider = window.ethereum;
    const web3Instance = new Web3(provider);
    console.log("it has aa",web3Instance);

    // Create contract instance
    const contractInstance = new web3Instance.eth.Contract(MarketAddressABI, MarketAddress);

    setWeb3(web3Instance);
    setContract(contractInstance);
  }, []);

  function convertWeiToEth(wei) {
    const ether = wei / 10**18;
    return ether;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { value } = event.target.elements.address;
    console.log("it has ",web3);
    const accounts = await web3.eth.getAccounts();
    const address = value.trim();
  
    console.log("Acc",accounts)
  
    // Execute smart contract function
    await contract.methods.buyProduct(accounts[0]).send({
      from: accounts[0],
      value: web3.utils.toWei('0.001', 'ether'),
      gas: 500000 // or any higher value
    })
  
    const temppool = await contract.methods.getBalance(accounts[0]).call()
    // const valueinEth = convertWeiToEth(temppool)
    settemp(temppool)
  
    console.log("the value is ",temppool)
  
    // Redirect to confirmation page
    router.push({
      pathname: '/confirmation',
      query: { price: temppool },
    });
  };
  
  const handleReleaseFunds = async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.releaseFunds().send({
      from: accounts[0],
      gas: 500000 // or any higher value
    });
  }

  return (
    <>
      <div>
        <h1>product name</h1>
        <p>pdes</p>
        <h2>price 2 ETH</h2>
        <h2>{temp}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="address">Enter your address:</label>
          <input type="text" name="address" required />
          <button type="submit">Buy now</button>
        </form>
        <button onClick={handleReleaseFunds}>Release Funds</button>
      </div>
    </>
  )
}

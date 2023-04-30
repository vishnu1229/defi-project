import Head from 'next/head'
import { useState } from 'react';
import Web3 from 'web3';
import { MarketAddress, MarketAddressABI } from '@/context/address';
import styles from '@/styles/Home.module.css'

export default function ReleaseFunds() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [sellerAddress, setSellerAddress] = useState('');
  const [releaseStatus, setReleaseStatus] = useState('');

  async function releaseFunds() {
    try {
      const accounts = await web3.eth.getAccounts();
      const releaseResult = await contract.methods.releaseFunds(sellerAddress).send({
        from: accounts[0],
        gas: 500000 // or any higher value
      });
      setReleaseStatus(`Funds released successfully! Transaction hash: ${releaseResult.transactionHash}`);
    } catch (error) {
      setReleaseStatus(`Error releasing funds: ${error.message}`);
    }
  }

  function connectWeb3() {
    const provider = window.ethereum;
    const web3Instance = new Web3(provider);

    const contractInstance = new web3Instance.eth.Contract(MarketAddressABI, MarketAddress);

    setWeb3(web3Instance);
    setContract(contractInstance);
  }

  return (
    <>
      <Head>
        <title>Release Funds | My E-Commerce Site</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <h1>Release Funds</h1>
        <p>Enter the seller's Ethereum wallet address to release the funds:</p>
        <form onSubmit={e => { e.preventDefault(); releaseFunds(); }}>
          <label htmlFor="seller-address">Seller's Address:</label>
          <input type="text" id="seller-address" name="seller-address" value={sellerAddress} onChange={e => setSellerAddress(e.target.value)} required />
          <button type="submit" disabled={!web3}>Release Funds</button>
        </form>
        {releaseStatus && <p>{releaseStatus}</p>}
      </main>
    </>
  );
}
    
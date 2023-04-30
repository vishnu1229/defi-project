import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Web3 from 'web3';
import { MarketAddress, MarketAddressABI } from '@/context/address';

const Confirmation = () => {
  const router = useRouter();
  const { price } = router.query;
  const [isFundsReleased, setIsFundsReleased] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  const handleReleaseFunds = async () => {
    const provider = window.ethereum;
    const web3Instance = new Web3(provider);

    const contractInstance = new web3Instance.eth.Contract(MarketAddressABI, MarketAddress);

    setWeb3(web3Instance);
    setContract(contractInstance);

    const accounts = await web3Instance.eth.getAccounts();

    try {
      await contractInstance.methods.releaseFunds("0xb206d55DC63435844fab4fc0A6c8D1ac8FD672c0",price).send({
        from: accounts[0],
        gas: 500000 // or any higher value
      });
      setIsFundsReleased(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Transaction completed</h1>
      <p>Price: {price} ETH</p>
      {!isFundsReleased && (
        <button onClick={handleReleaseFunds}>Release funds to seller</button>
      )}
      {isFundsReleased && (
        <p>Funds released to seller</p>
      )}
    </div>
  );
};

export default Confirmation;

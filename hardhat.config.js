require("@nomicfoundation/hardhat-toolbox");
const fs = require('fs');
/** @type import('hardhat/config').HardhatUserConfig */
const PRIVATE_KEY = fs.readFileSync('.secret').toString().trim();
require('dotenv').config();
module.exports = {
  networks: {
    hardhat: {
      chainId: 11155111,
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/eSEju7Edw4mYpyjpIw-H0qy9kMkdJ227",
      accounts: [PRIVATE_KEY]
    }

  },
  solidity: "0.8.18",
};
// deploy.js
const ethers = require("hardhat")
async function main() {
  const PaymentGateway = await hre.ethers.getContractFactory("PaymentGateway");
  const paymentGateway = await PaymentGateway.deploy();
  await paymentGateway.deployed();
  console.log("PaymentGateway deployed to:", paymentGateway.address);
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});

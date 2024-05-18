
const { ethers, run, network } = require("hardhat");

async function main() {

  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
 
  console.log("Deploying, please wait...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();

  console.log(`Deployed contract to: ${simpleStorage.address}`);
    
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) { // nếu chạy trên sepolia network và có tồn tại process.env.ETHERSCAN_API_KEY
    console.log("Waiting for block confirmations..."); // Waiting for confirmation in the next 6 blocks...
    await simpleStorage.deployTransaction.wait(6);
   
    await verify(simpleStorage.address, []); // tham số thứ hai là một list trống vì SimpleStorage.sol không có constructor
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is: ${currentValue}`);

  const transactionResponse = await simpleStorage.store("99");
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value is: ${updatedValue}`);

}

const verify = async (contractAddress, args) => {

  console.log("Verifying contract...");
  try {
    await run("verify:verify", { 
      address: contractAddress,
      constructorArguments: args
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) { 
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }   
}

main()
    .then(() => process.exit(0)) 
    .catch((error) => { 
    console.error(error); 
    process.exit(1); 
})

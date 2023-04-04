async function execute() {
    const { ethers } = require("ethers");

    // define ERC-20 token address and ABI
    const contractAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"; // Link address in mumbai
    const abi = [
        "function balanceOf(address) view returns (uint256)",
        "function transfer(address to, uint256 amount) returns (boolean)",
    ];

    const recipients = [
        { address: "<addr to transfer>", amount: ethers.utils.parseEther("<amount of token to transfer>") },
        { address: "<addr to transfer>", amount: ethers.utils.parseEther("<amount of token to transfer>") },
        { address: "<addr to transfer>", amount: ethers.utils.parseEther("<amount of token to transfer>") },
    ];
    
    const provider = new ethers.providers.JsonRpcProvider("<RPC URL>");
    
    // create wallet based on your private key
    const privateKey = "<YOUR PRIVATEKEY>";
    const wallet = new ethers.Wallet(privateKey, provider);

    // instantiate contract with address and abi
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    const publicKey = await wallet.getAddress();
    
    // get the latest nonce
    var nonce = await provider.getTransactionCount(publicKey, 'latest')
    
    for (const recipient of recipients) {
        console.log("toAddr is" + recipient.address);
        console.log("amount is" + recipient.amount);
        const functionArgs = [recipient.address, recipient.amount];
        const tx = await contract.functions["transfer"](...functionArgs, { nonce });
        nonce++;
    }
}
    
execute()
    .then(() => console.log('complete...'))
    .catch(error => console.log('error...', error))
    .finally(() => process.exit(0))
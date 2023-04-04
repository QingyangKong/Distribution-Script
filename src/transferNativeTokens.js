async function execute() {
    const { ethers } = require("ethers");
    const { NonceManager } = require("@ethersproject/experimental");  
  
    const recipients = [
      { address: "<addr to transfer>", amount: ethers.utils.parseEther("<amount of token to transfer>") },
      { address: "<addr to transfer>", amount: ethers.utils.parseEther("<amount of token to transfer>") },
      { address: "<addr to transfer>", amount: ethers.utils.parseEther("<amount of token to transfer>") },
    ];
  
    const provider = new ethers.providers.JsonRpcProvider("<RPC URL>");
    
    // create wallet based on your private key
    const privateKey = "<YOUR PRIVATE KEY>";
    const wallet = new ethers.Wallet(privateKey, provider);
    const publicKey = await wallet.getAddress();
    
    // get latest nonce and instantiate nonce manager
    const manager = new NonceManager(wallet)
    var nonce = await provider.getTransactionCount(publicKey, 'latest')
    console.log("address is " + publicKey + " nonce is " + nonce)
  
    // define the gas limit and gas price
    const gasPrice = ethers.utils.parseUnits("30", "gwei"); 
    const gasLimit = 21000;
  
    // distribute tokens to recipents
    for (const recipient of recipients) {
      console.log("toAddr is" + recipient.address);
      const tx = {
        to: recipient.address,
        value: recipient.amount,
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
      }
      nonce++;
  
      // Replace signer with nonce manager
      await manager.sendTransaction(tx).then(response => {
        console.log(`TX Hash: ${response.hash}`)
      })
    }
}
  
// execute the functions to distribute tokens
execute()
    .then(() => console.log('complete...'))
    .catch(error => console.log('error...', error))
    .finally(() => process.exit(0))
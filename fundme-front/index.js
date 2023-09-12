import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const withdrawButton = document.getElementById("withdrawButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
const sendButton = document.getElementById("sendButton")
const newownerButton = document.getElementById("newownerButton")
const ShowownerButton = document.getElementById("ShowownerButton")

connectButton.onclick = connect
withdrawButton.onclick = withdraw
fundButton.onclick = fund
balanceButton.onclick = getBalance
sendButton.onclick = Send
newownerButton.onclick = newOwner
ShowownerButton.onclick = showowner
async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" })
    } catch (error) {
      console.log(error)
      document.getElementById("wallet-address").textContent = error
    }
    connectButton.innerHTML = "Connected"
    const accounts = await ethereum.request({ method: "eth_accounts" })
    const account = accounts[0]
    console.log(accounts)
    document.getElementById("wallet-address").textContent = "Connected  "+account.substring(0, 5) + "..." + account.substring(37, 42)
  } else {
    connectButton.innerHTML = "Please install MetaMask"
    document.getElementById("wallet-address").textContent ="Please install MetaMask"
  }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value
    console.log(`Funding with ${ethAmount}...`)
    document.getElementById("get-Fund").textContent = `Funding with ${ethAmount}...`
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        const transactionResponse = await contract.fund({
          value: ethers.utils.parseEther(ethAmount),
        })
        await listenForTransactionMine(transactionResponse, provider)
        console.log("Done")
        document.getElementById("get-Fund").textContent = `Funded  ${ethAmount}  ETH  Done`
        const balance = await provider.getBalance(contractAddress)
        document.getElementById("get-Ballance").textContent = ethers.utils.formatEther(balance)
    } catch (error) {
        console.log(error)
        document.getElementById("get-Fund").textContent = error
      }
    } else {
      fundButton.innerHTML = "Please install MetaMask"
      document.getElementById("get-Fund").textContent ="Please install MetaMask"
    }
  }
  
function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}`)
    return new Promise((resolve, reject) => {
        try {
            provider.once(transactionResponse.hash, (transactionReceipt) => {
                console.log(
                    `Completed with ${transactionReceipt.confirmations} confirmations. `
                )
                resolve()
            })
        } catch (error) {
            reject(error)
        }
    })
}
async function withdraw() {
    console.log(`Withdrawing...`)
    document.getElementById("Withdraw").textContent = `Withdrawing...`
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        const transactionResponse = await contract.withdraw()
        await listenForTransactionMine(transactionResponse, provider)
        document.getElementById("Withdraw").textContent = "Withdraw Done"
        // await transactionResponse.wait(1)
      } catch (error) {
        console.log(error)
        document.getElementById("Withdraw").textContent = error
      }
    } else {
      withdrawButton.innerHTML = "Please install MetaMask"
      document.getElementById("Withdraw").textContent = "Please install MetaMask"
    }
  }
  
async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      try {
        const balance = await provider.getBalance(contractAddress)
        console.log(ethers.utils.formatEther(balance))
        document.getElementById("get-Ballance").textContent = ethers.utils.formatEther(balance)
      } catch (error) {
        console.log(error)
        document.getElementById("get-Ballance").textContent = error
      }
    } else {
      balanceButton.innerHTML = "Please install MetaMask"
      document.getElementById("get-Ballance").textContent = "Please install MetaMask"
    }
  }
  async function Send() {
    const sendAddress = document.getElementById("receiver").value
    const ethAmount = document.getElementById("sendamount").value
    console.log(`Sending with ${ethAmount}...`)
    document.getElementById("sending").textContent = `Sending with ${ethAmount}...`
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        const transactionResponse = await contract.transfer(
          sendAddress , ethers.utils.parseEther(ethAmount) 
        )
        await listenForTransactionMine(transactionResponse, provider)
        console.log("Done")
        document.getElementById("sending").textContent = `sended  ${ethAmount}  ETH  Done`
    } catch (error) {
        console.log(error)
        document.getElementById("sending").textContent = error
      }
    } else {
      fundButton.innerHTML = "Please install MetaMask"
      document.getElementById("sending").textContent ="Please install MetaMask"
    }
  }  

  async function newOwner() {
    const sendAddress = document.getElementById("changeOwner").value
    console.log(`Changing with ...`)
    document.getElementById("newowner-address").textContent = `Sending with ${ethAmount}...`
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        const transactionResponse = await contract.transferOwnership(
          sendAddress  
        )
        await listenForTransactionMine(transactionResponse, provider)
        console.log("Done")
        document.getElementById("newowner-address").textContent = " new Owners Address  "+Address.substring(0, 5) + "..." + Address.substring(37, 42)
    } catch (error) {
        console.log(error)
        document.getElementById("newowner-address").textContent = error
      }
    } else {
      fundButton.innerHTML = "Please install MetaMask"
      document.getElementById("newowner-address").textContent ="Please install MetaMask"
    }
  }  

  async function showowner() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        const Address = await contract.getOwner()
        console.log(Address)
        document.getElementById("newowner-address").textContent = "Owners Address  "+Address.substring(0, 5) + "..." + Address.substring(37, 42)
      } catch (error) {
        console.log(error)
        document.getElementById("newowner-address").textContent = error
      }
    } else {
      balanceButton.innerHTML = "Please install MetaMask"
      document.getElementById("newowner-address").textContent = "Please install MetaMask"
    }
  }
require("@nomiclabs/hardhat-waffle")
require("dotenv").config()
require("hardhat-deploy")
//require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan")
//require("@nomicfoundation/hardhat-chai-matchers")
require("./tasks/block-number.js")
//in mire too .env adres , pivate key khodet , haminayyi ke inja zada ro migire...

const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL ||
    "https://eth-sepolia.g.alchemy.com/v2/2yt4Y29v01_zGNxX6Lr1TAKX4lXk2ZvH"
const PRIVATE_KEY =
    process.env.PRIVATE_KEY ||
    "0x11ee3108a03081fe260ecdc106554d09d9d1209bcafd46942b10e02943effc4a"

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""   

module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.19",
            },
            {
                version: "0.6.6",
            },
        ],
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
        // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
    },
  defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            // gasPrice: 130000000000,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            //accounts: [PRIVATE_KEY],
            chainId: 31337,
        },
        
    },

    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
        },
    },
};
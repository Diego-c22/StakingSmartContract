require('@nomicfoundation/hardhat-toolbox')
require('solidity-docgen')
require('hardhat-exposed')

require('dotenv').config({
  path: `./.env${process.env.ENV ? '.' + process.env.ENV : ''}`,
})

const API_KEY_SCAN = process.env.API_KEY_SCAN
const DEPLOYER_WALLET_PRIVATE_KEY = process.env.DEPLOYER_WALLET_PRIVATE_KEY
const URL_RPC_MAINNET = process.env.URL_RPC_MAINNET
const URL_RPC_TESTNET = process.env.URL_RPC_TESTNET
const URL_RPC_LOCAL = process.env.URL_RPC_LOCAL
const ALCHEMY_KEY = process.env.ALCHEMY_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',

  gasReporter: {
    enabled: true,
  },

  etherscan: {
    apiKey: {
      // goerli: API_KEY_SCAN,
      polygonMumbai: process.env.API_KEY_SCAN,
    },
  },
  networks: {
    testnet: {
      url: URL_RPC_TESTNET,
      accounts: [DEPLOYER_WALLET_PRIVATE_KEY],
    },
    local: {
      url: URL_RPC_LOCAL,
      accounts: [DEPLOYER_WALLET_PRIVATE_KEY],
    },
    mainnet: {
      url: URL_RPC_MAINNET,
      accounts: [DEPLOYER_WALLET_PRIVATE_KEY],
    },
    // hardhat: {
    //   forking: {
    //     url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    //   },
    // },

    // localhost: {
    //   forking: {
    //     url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    //   },
    // },
  },
}

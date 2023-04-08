// import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
import "hardhat-deploy"
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import { ProxyAgent, setGlobalDispatcher } from "undici"

// const proxyAgent = new ProxyAgent("http://127.0.0.1:32321")
// setGlobalDispatcher(proxyAgent)

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{version: "0.8.18"},{version:"0.6.12"}]
  },
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      chainId: 11155111,
      url: "https://sepolia.infura.io/v3/API",
      accounts: [
          "account"
      ],
    },
    goerli: {
      chainId: 4,
      url: "https://goerÏli.infura.io/v3/API",
      accounts: [
          "account"
      ]
    }
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  },
  etherscan: {
    apiKey: "API"
  }
};

export default config;

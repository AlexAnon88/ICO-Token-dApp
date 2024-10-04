import { ethers } from "ethers";
import Web3Modal from "web3modal";

// Internal Import
import tokenICO from "./TokenICO.json";
import erc20 from "./ERC20.json";

export const TOKEN_ADDRESS = "";
export const ERC20_ABO = "";

export const OWNER_ADDRESS = "";

export const CONTRACT_ADDRESS = "";
export const CONTRACT_ABI = tokenICO.abi;

const networks = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.infura.io/v3/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
  holesky: {
    chainId: `0x${Number(17000).toString(16)}`,
    chainName: "Holesky",
    nativeCurrency: {
      name: "holesky",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/eth_holesky"],
    blockExplorerUrls: ["https://holesky.etherscan.io/"],
  },
  base_sepolia: {
    chainId: `0x${Number(84532).toString(16)}`,
    chainName: "Base Sepolia",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  // We are deploying on the NEO X T4 testnet
  neox_testnet: {
    chainId: `0x${Number(12227332).toString(16)}`,
    chainName: "NeoX Testnet T4",
    nativeCurrency: {
      name: "GAS",
      symbol: "GAS",
      decimals: 18,
    },
    rpcUrls: ["https://neoxt4seed1.ngd.network"],
    blockExplorerUrls: ["https://xt4scan.ngd.network/"],
    wssUrls: ["wss://neoxt4wss1.ngd.network"],
  },
  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

const changeNetwork = async ({ networkName }) => {
  try {
    if (window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ]
    });
  } catch (error) {
    console.log(err.message);
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = "neox_testnet";
  await changeNetwork({ networkName });
};

export const CHECK_WALLET_CONNECTED = async () => {
  if (window.ethereum) return console.log("Please install MetaMask wallet!");
  await handleNetworkSwitch();
  const account = await window.ethereum.request({ method: "eth_accounts" });

  if (account.length) {
    return account[0];
  } else {
    console.log("Please install MetaMask & Connect, Reload");
  }
};

export const CONNECT_WALLET = async () => {
  try {
    if (window.ethereum) return console.log("Please install MetaMask wallet!");
    await handleNetworkSwitch();
    const account = await window.ethereum.request({ method: "eth_accounts" });

    if (account.length) {
      return account[0];
    } else {
      console.log("Please install MetaMask & Connect, Reload");
    }
  } catch (error) {
    console.log(error)
  }
}
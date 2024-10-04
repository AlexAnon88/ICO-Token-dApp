import { ethers } from "ethers";
import Web3Modal from "web3modal";

// Internal Import
import tokenICO from "./TokenICO.json";
import erc20 from "./ERC20.json";

// ERC20.sol is deployed on NeoX T4 Testnet
export const TOKEN_ADDRESS = "0x4dC79Eab0170284d6165164f2Fd6ad432310425A";
export const ERC20_ABI = erc20.abi;

// My MetaMask account address used to deploy on NeoX T4 Testnet
export const OWNER_ADDRESS = "0x04381e20A2Bca7Df8D6e173D6fE1726823e956Ee";

// TokenICO.sol is deployed on NeoX T4 Testnet
export const CONTRACT_ADDRESS = "0x6b31505B725e36C8580E4aB92374806FBFEe2E66";
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
    const account = await window.ethereum.request({ method: "eth_requestAccounts" });

    window.location.reload();
    return account[0];
  } catch (error) {
    console.log(error)
  }
};

const fetchContract = (address, abi, signer) => new ethers.Contract(address, abi, signer)

export const TOKEN_ICO_CONTRACT = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const contract = fetchContract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    return contract;

  } catch (error) {
    console.log(error)
  }
};

export const ERC20 = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const network = await provider.getNetwork();
    const signer = await provider.getSigner();

    const userAddress = signer.getAddress();
    const balance = await contract.balanceOf(userAddress);

    const name = await contract.name();
    const symbol = await contract.symbol();
    const supply = await contract.totalSupply();
    const decimals = await contract.decimals();
    const address = await contract.address;

    const token = {
      address: address,
      name: name,
      symbol: symbol,
      decimals: decimals,
      supply: ethers.utils.formatEther(supply.toString()),
      balance: ethers.utils.formatEther(balance.toString()),
      chainId: network.chainId,
    };
    console.log(token);
    return token;

  } catch (error) {
    console.log(error)
  }
};

export const ERC20_CONTRACT = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const contract = fetchContract(CONTRACT_ADDRESS, ERC20_ABI, signer);

    return contract;

  } catch (error) {
    console.log(error)
  }
};

export const GET_BALANCE = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const neoxBalance = await signer.getBalance();

    return ethers.utils.formatEther(neoxBalance.toString());
  } catch (error) {
    console.log(error)
  }
};

export const CHECK_ACCOUNT_BALANCE = async (ADDRESS) => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const neoxBalance = await signer.getBalance(ADDRESS);

    return ethers.utils.formatEther(neoxBalance.toString());
  } catch (error) {
    console.log(error)
  }
};

export const addTokenToMetaMask = async () => {
  if (window.ethereum) {
    const tokenDetails = await ERC20(TOKEN_ADDRESS);

    const tokenDecimals = tokenDecimals?.decimals;
    const tokenAddress = tokenAddress;
    const tokenSymbol = tokenDecimals?.symbol;
    const tokenImage = "";

    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params:{
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          }
        }
      });
      if(wasAdded){
        return "Token added!";
      } else {
        return "Token not added";
      }
    } catch (error) {
      return "Failed to add";
    }
  } else {
    return "MetaMask is not installed";
  }
};
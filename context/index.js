import React, { Children, useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

import {
    CHECK_WALLET_CONNECTED,
    CONNECT_WALLET,
    GET_BALANCE,
    CHECK_ACCOUNT_BALANCE,
    TOKEN_ICO_CONTRACT,
    ERC20,
    ERC20_CONTRACT,
    TOKEN_ADDRESS,
    addTokenToMetaMask
} from "./constants";

export const TOKEN_ICO_CONTEXT = React.createContext();
export const TOKEN_ICO_PROVIDER = ({ childer }) => {
    const DAPP_NAME = "TOKEN ICO DAPP";
    const currency = "GAS";
    const network = "Neox T4";

    const [loader, setLoader] = useState(false);
    const [account, setAccount] = useState();
    const [count, setCount] = useState(0);

    const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
    const notifyError = (msg) => toast.error(msg, { duration: 2000 });

    // --- Contract Functions ---
    const TOKEN_ICO = async () => {
        try {
            const address = await CHECK_WALLET_CONNECTED();
            if(address){
                setLoader(true);
                setAccount(address);

                const contract = await TOKEN_ICO_CONTRACT();

                const tokenDetails = await contract.getTokenDetails();
                const contractOwner = await contract.owner();
                const soldTokens = await contract.soldTokens();
            
                const ethBal = await GET_BALANCE();
                const token = {
                    tokenBal: ethers.utils.formatEther(tokenDetails.balance.toString()),
                    name: tokenDetails.name,
                    symbol: tokenDetails.symbol,
                    supply: ethers.utils.formatEther(tokenDetails.supply.toString()),
                    tokenPrice: ethers.utils.formatEther(tokenDetails.tokenPrice.toString()),
                    tokenAddr: tokenDetails.tokenAddr,
                    neoxBalance: ethBal,
                    address: address.toLowerCase(),
                    owner: contractOwner.toLowerCase(),
                    soldTokens: soldTokens.toNumber(),
                };
                setLoader(false);
                return token;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const BUY_TOKEN = async () => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    const TOKEN_WITHDRAW = async () => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
    const UPDATE_TOKEN = async () => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    const UPDATE_TOKEN_PRICE = async () => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
    
    const DONATE = async () => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    const TRANSFER_ETHER = async () => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    const TRANSFER_TOKEN = async () => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
};
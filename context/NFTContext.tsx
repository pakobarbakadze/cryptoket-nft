import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { NFTStorage, File } from "nft.storage";

import { MarketAddress, MarketAddressABI } from "./constants";
import { NFT } from "@/types";
import { NextRouter } from "next/router";

const client = new NFTStorage({ token: process.env.NFT_STORAGE_API! });

const fetchContract = (signerOrProvider: any) =>
  new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

type NFTContextType = {
  nftCurrency: string;
  connectWallet: () => void;
  currentAccount: string;
  createNFT: (
    formInput: any,
    router: NextRouter,
    fileUrl?: string | null
  ) => void;
  createSale: (
    url: any,
    formInputPrice: string,
    id?: string,
    isReselling?: boolean
  ) => void;
  fetchNFTs: () => void;
  fetchMyNFTsOrListedNFTs: (type: string) => void;
  buyNFT: (nft: NFT) => void;
  isLoadingNFT: boolean;
};

export const NFTContext = React.createContext<NFTContextType>({
  nftCurrency: "",
  connectWallet: () => {
    throw new Error("Function not implemented.");
  },
  currentAccount: "",
  createNFT: (formInput: any, router: NextRouter, fileUrl?: string | null) => {
    throw new Error("Function not implemented.");
  },
  createSale: (url, formInputPrice, id, isReselling) => {
    throw new Error("Function not implemented.");
  },
  fetchNFTs: () => {
    throw new Error("Function not implemented.");
  },
  fetchMyNFTsOrListedNFTs: (type: string) => {
    throw new Error("Function not implemented.");
  },
  buyNFT: (nft: NFT) => {
    throw new Error("Function not implemented.");
  },
  isLoadingNFT: false,
});

export const NFTProvider = ({ children }: any) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoadingNFT, setIsLoadingNFT] = useState(false);
  const nftCurrency = "ETH";

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) {
      return alert("Please install MetaMask");
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      return alert("Please install MetaMask");
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const createSale = async (
    url: string,
    formInputPrice: string,
    id?: string,
    isReselling?: boolean
  ) => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice, "ether");
    const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();

    const transaction = !isReselling
      ? await contract.createToken(url, price, {
          value: listingPrice.toString(),
        })
      : await contract.resellToken(id, price, {
          value: listingPrice.toString(),
        });
    setIsLoadingNFT(true);
    await transaction.wait();
  };

  const createNFT = async (formInput: any, router: NextRouter) => {
    const { name, description, price, image } = formInput;

    if (!name || !description || !price) return;
    const data = { name, description, image };

    try {
      const metadata = await client.store(data);
      const url = metadata.url;
      await createSale(url, price);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNFTs = async () => {
    setIsLoadingNFT(false);

    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const data = await contract.fetchMarketItems();

    const items = await Promise.all(
      data.map(
        async ({ tokenId, seller, owner, price: unformattedPrice }: any) => {
          const tokenURI = await contract.tokenURI(tokenId);
          const {
            data: { image, name, description },
          } = await axios.get(tokenURI);
          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            "ether"
          );

          return {
            price,
            tokenId: tokenId.toNumber(),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI,
          };
        }
      )
    );

    return items;
  };

  const fetchMyNFTsOrListedNFTs = async (type: string) => {
    setIsLoadingNFT(false);

    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);
    const data =
      type === "fetchItemsListed"
        ? await contract.fetchItemsListed()
        : await contract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(
        async ({ tokenId, seller, owner, price: unformattedPrice }: any) => {
          const tokenURI = await contract.tokenURI(tokenId);
          const {
            data: { image, name, description },
          } = await axios.get(tokenURI);
          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            "ether"
          );

          return {
            price,
            tokenId: tokenId.toNumber(),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI,
          };
        }
      )
    );

    return items;
  };

  const buyNFT = async (nft: NFT) => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    });
    setIsLoadingNFT(true);
    await transaction.wait();
    setIsLoadingNFT(false);
  };

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        connectWallet,
        currentAccount,
        createNFT,
        createSale,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        isLoadingNFT,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};

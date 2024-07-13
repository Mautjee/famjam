import { Avatar, ChainConfig, Sdk } from "@circles-sdk/sdk";
import { getBrowserProvider } from "./util";
import { useEffect, useState } from "react";
import { useAppStore } from "../store";
import { Profile } from "../types";

//TODO: Make these env variables
export const chainConfig: ChainConfig = {
  circlesRpcUrl: "https://chiado-rpc.aboutcircles.com",
  v1HubAddress: "0xdbf22d4e8962db3b2f1d9ff55be728a887e47710",
  v2HubAddress: "0x2066CDA98F98397185483aaB26A89445addD6740",
  migrationAddress: "0x2A545B54bb456A0189EbC53ed7090BfFc4a6Af94",
};

export const useCerclesSdk = () => {
  const connected = useAppStore((state) => state.connected);
  const wallet = useAppStore((state) => state.wallet);
  const sdk = useAppStore((state) => state.sdk);

  const setReady = useAppStore((state) => state.setReady);
  const setConnected = useAppStore((state) => state.setConnected);
  const setWallet = useAppStore((state) => state.setWallet);
  const setSdk = useAppStore((state) => state.setSdk);

  const [avatar, setAvatar] = useState<Avatar | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false); // new loading state
  const [error, setError] = useState<string | null>(null);
  const [userInteraction, setUserInteraction] = useState(false);

  const initialized = sdk && connected && wallet;

  // initialization logic
  useEffect(() => {
    const initializeSdk = async () => {
      setIsLoading(true);

      if (!connected && !userInteraction) {
        connectWallet();
      }
      try {
        if (sdk) {
          return;
        } // return early to avoid multiple calls
        if (!wallet) return;
        const cerclesSdk = new Sdk(chainConfig, wallet);
        setSdk(cerclesSdk);
      } catch (error) {
        setError((error as Error).message || "Failed to initialize");
      } finally {
        setIsLoading(false);
        initialized ? setReady(true) : setReady(false);
      }
    };
    initializeSdk();
  }, [connected, sdk, wallet, setSdk]);

  const connectWallet = async () => {
    setUserInteraction(true);
    try {
      const provider = getBrowserProvider();
      const signer = await provider.getSigner();
      const wallet = {
        runner: signer,
        address: await signer.getAddress(),
      };
      setWallet(wallet);
      setConnected(true);
    } catch (err) {
      setError("Failed to connect wallet");
    }
  };

  const getAvatar = async () => {
    if (!sdk || !wallet) return;
    try {
      if (avatar) return avatar;

      const avatarNew = await sdk.getAvatar(wallet.address);
      setAvatar(avatarNew);
      setError(null);
      return avatarNew;
    } catch (error) {
      setError("Failed to get avatar");
    }
  };

  const getTransactions = async () => {
    if (!avatar) return;
    setIsLoading(true);

    try {
      const transactions = await avatar.getTransactionHistory(5);
      return transactions;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const getProfile = async () => {
    if (!avatar) return;
    setIsLoading(true);

    try {
      const balance = await avatar.getTotalBalance();
      const type = avatar.avatarInfo?.type || "Unknown";

      const profile: Profile = {
        address: avatar.address,
        type: type,
        balance: balance,
      };
      console.log("profile", profile);
      setError(null);
      return profile;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    getProfile,
    getTransactions,
    getAvatar,
    connectWallet,
    isLoading,
    error,
  };
};

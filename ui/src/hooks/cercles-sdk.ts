import { Avatar, ChainConfig, Sdk } from "@circles-sdk/sdk";
import { getBrowserProvider } from "./util";
import { useState } from "react";
import { ConnectedWallet } from "../types";
import { useAppStore } from "../store";

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
  const setConnected = useAppStore((state) => state.setConnected);
  const setWallet = useAppStore((state) => state.setWallet);
  const setSdk = useAppStore((state) => state.setSdk);

  const [avatar, setAvatar] = useState<Avatar | undefined>(undefined);

  const connectWallet = async () => {
    const provider = getBrowserProvider();
    const signer = await provider.getSigner();

    const wallet = {
      runner: signer,
      address: await signer.getAddress(),
    };

    if (!wallet) {
      throw new Error("No wallet found");
    }

    setWallet(wallet);
    setConnected(true);
  };

  const initialize = async () => {
    if (!connected) {
      await connectWallet();
    }

    if (!sdk) return;
    if (!wallet) return;

    const cerclesSdk = new Sdk(chainConfig, wallet);
    if (!cerclesSdk) {
      throw new Error("Failed to initialize SDK");
    }
    setSdk(cerclesSdk);
  };

  const getAvatar = async () => {
    if (!sdk || !wallet) return;
    if (avatar) return avatar;

    const avatarNew = await sdk.getAvatar(wallet.address);
    if (!avatarNew) {
      return undefined;
    }
    setAvatar(avatarNew);
    return avatarNew;
  };

  return { getAvatar, initialize };
};

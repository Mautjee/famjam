import { create } from "zustand";
import { ConnectedWallet } from "../types";
import { Avatar, Sdk } from "@circles-sdk/sdk";

interface AppState {
  ready: boolean;
  connected: boolean;
  wallet?: ConnectedWallet; // Matcha Creatine ect.
  sdk?: Sdk;
  avatar: Avatar | undefined;

  setReady: (ready: boolean) => void;
  setConnected: (connected: boolean) => void;
  setWallet: (wallet: ConnectedWallet) => void;
  setSdk: (sdk: Sdk) => void;
  setAvatar: (avatar: Avatar | undefined) => void;
}
export const useAppStore = create<AppState>((set) => ({
  ready: false,
  connected: false,
  wallet: undefined,
  sdk: undefined,
  avatar: undefined,

  setReady: (ready) => set({ ready }),
  setConnected: (connected) => set({ connected }),
  setWallet: (wallet) => set({ wallet }),
  setSdk: (sdk) => set({ sdk }),
  setAvatar: (avatar) => set({ avatar }),
}));

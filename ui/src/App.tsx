import { AvatarRow, ChainConfig, Sdk } from "@circles-sdk/sdk";
import { BrowserProvider } from "ethers";
import { useState } from "react";

const chainConfig: ChainConfig = {
  circlesRpcUrl: "https://chiado-rpc.aboutcircles.com",
  v1HubAddress: "0xdbf22d4e8962db3b2f1d9ff55be728a887e47710",
  v2HubAddress: "0x2066CDA98F98397185483aaB26A89445addD6740",
  migrationAddress: "0x2A545B54bb456A0189EbC53ed7090BfFc4a6Af94",
};

function getBrowserProvider() {
  const w: any = window;
  if (!w.ethereum) {
    throw new Error("No browser wallet found (window.ethereum is undefined)");
  }
  return new BrowserProvider(w.ethereum);
}

async function initializeSdk(walllet: { runner: any; address: string }) {
  // The circles sdk must be initialized with the
  // contract addresses and endpoints for the chain.
  // It takes a signer as the second argument.
  return new Sdk(chainConfig, walllet);
}

function App() {
  const [avatarType, setAvatarType] = useState<AvatarRow | undefined>();

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

    const sdk = await initializeSdk(wallet);

    const avatarInfo = await sdk.getAvatar(wallet.address);

    setAvatarType(avatarInfo.avatarInfo);
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      {avatarType ? (
        <p className="text-3xl font-bold">Avatar type: {avatarType.version}</p>
      ) : (
        <button
          className="text-3xl font-bold"
          onClick={() => void connectWallet()}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default App;

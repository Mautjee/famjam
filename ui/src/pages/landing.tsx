import { Outlet } from "@tanstack/react-router";
import { BottomNavBar } from "../components";
import { useAppStore } from "../store";
import { useCerclesSdk } from "../hooks/cercles-sdk";

export const Landing = () => {
  const ready = useAppStore((state) => state.ready);
  const { connectWallet, isLoading } = useCerclesSdk();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center ">
        Loading...
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="h-screen w-screen flex justify-center items-center ">
        <button
          className="btn btn-primary"
          onClick={() => void connectWallet()}
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Outlet />
      <br />
      <BottomNavBar />
    </div>
  );
};

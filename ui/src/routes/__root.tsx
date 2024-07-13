import { createRootRoute, Outlet } from "@tanstack/react-router";
import { BottomNavBar } from "../components";

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen flex flex-col bg-gray-100">
      <Outlet />
      <br />
      <BottomNavBar />
    </div>
  ),
});

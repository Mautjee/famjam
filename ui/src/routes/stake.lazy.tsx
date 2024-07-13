import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/stake")({
  component: Stake,
});

function Stake() {
  return <div className="p-2">Hello from Stake!</div>;
}


import { createLazyFileRoute } from "@tanstack/react-router";
import { useCerclesSdk } from "../hooks/cercles-sdk";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { getAvatar } = useCerclesSdk();

  return (
    <div className="p-2">
      <h3 className="text-xl">Welcome Home!</h3>
    </div>
  );
}

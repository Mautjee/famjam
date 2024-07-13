import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/send")({
  component: Send,
});

function Send() {
  return <div className="p-2">Hello from Send!</div>;
}

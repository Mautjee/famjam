import { createLazyFileRoute } from "@tanstack/react-router";
import { Send } from "../pages";

export const Route = createLazyFileRoute("/send")({
  component: Send,
});

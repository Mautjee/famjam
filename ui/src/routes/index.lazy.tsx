import { createLazyFileRoute } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  throw redirect({
    to: "/home",
  });
}


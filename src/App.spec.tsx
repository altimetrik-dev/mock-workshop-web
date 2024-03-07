import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";

// To Test
import App from "./App";

describe("App", () => {
  it("should renders App component", async () => {
    render(<App />);
    await waitFor(() => {
      const chips = screen.getByText("CL002M");
      expect(chips).toBeInTheDocument();
    });
  });
  it("should add a new ClientID chip", async () => {
    render(<App />);
    const input = await screen.findByLabelText(/client id/i);
    user.type(input, "ClientID{enter}");

    const chips = await screen.findByText("ClientID");
    expect(chips).toBeInTheDocument();
  });

  it("should remove a ClientID chip", async () => {
    render(<App />);
    const input = await screen.findByLabelText(/client id/i);
    await user.type(input, "ClientID{enter}");

    const chips = await screen.findByText("ClientID");
    expect(chips).toBeInTheDocument();

    const deleteButton = await screen.findByRole("button", {
      name: /ClientID/i,
    });
    await user.click(deleteButton);

    await waitFor(() => {
      expect(chips).not.toBeInTheDocument();
    });
  });
});

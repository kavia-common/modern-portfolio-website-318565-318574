import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders portfolio sections", () => {
  render(<App />);
  expect(screen.getByText(/About me/i)).toBeInTheDocument();
  expect(screen.getByText(/Skills/i)).toBeInTheDocument();
  expect(screen.getByText(/Projects/i)).toBeInTheDocument();
  expect(screen.getByText(/Contact/i)).toBeInTheDocument();
});

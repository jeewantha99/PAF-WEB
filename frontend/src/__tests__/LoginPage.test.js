import { render, screen } from "@testing-library/react";
import LoginPage from './../pages/Authentication/LoginPage';

test("banner text test", () => {
  render(<LoginPage />);
  const navElement = screen.getByTestId("banner_id");
  expect(navElement).toBeInTheDocument();
  expect(navElement).toHaveTextContent("Surge SE Internship");
});

test("banner name text test", () => {
  render(<LoginPage />);
  const navElement = screen.getByTestId("banner_name");
  expect(navElement).toBeInTheDocument();
  expect(navElement).toHaveTextContent("Sahan Randika");
});

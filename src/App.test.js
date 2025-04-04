import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the components that use react-router-dom
jest.mock("./components/Header", () => () => (
  <div data-testid="header">Header</div>
));
jest.mock("./components/Footer", () => () => (
  <div data-testid="footer">Footer</div>
));
jest.mock("./components/SongList", () => () => <div>Song List</div>);
jest.mock("./components/SongView", () => () => <div>Song View</div>);
jest.mock("./components/SongEditor", () => () => <div>Song Editor</div>);
jest.mock("./components/FavoritesList", () => () => <div>Favorites List</div>);

// Mock service calls
jest.mock("./services/githubService", () => ({
  loadSongsFromGithub: jest.fn().mockResolvedValue([]),
}));

jest.mock("./services/storageService", () => ({
  getFavorites: jest.fn().mockReturnValue([]),
}));

// Mock router
jest.mock("react-router-dom", () => ({
  HashRouter: ({ children }) => <div data-testid="router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: () => <div data-testid="route"></div>,
}));

test("renders loading state initially", () => {
  render(<App />);
  const loadingElement = screen.getByText(/loading songs/i);
  expect(loadingElement).toBeInTheDocument();
});

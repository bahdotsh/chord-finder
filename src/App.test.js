import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the dependencies that cause issues in testing
jest.mock("react-router-dom", () => ({
  HashRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: () => <div>Route</div>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: "/" }),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

// Mock the services that make external calls
jest.mock("./services/githubService", () => ({
  loadSongsFromGithub: jest.fn().mockResolvedValue([]),
  getSongById: jest.fn().mockResolvedValue({}),
  uploadSong: jest.fn().mockResolvedValue(""),
}));

jest.mock("./services/storageService", () => ({
  getFavorites: jest.fn().mockReturnValue([]),
  isInFavorites: jest.fn().mockReturnValue(false),
  addToFavorites: jest.fn(),
  removeFromFavorites: jest.fn(),
  getUserSongs: jest.fn().mockReturnValue([]),
}));

test("renders chord finder app", () => {
  render(<App />);
  const loadingElement = screen.getByText(/loading songs/i);
  expect(loadingElement).toBeInTheDocument();
});

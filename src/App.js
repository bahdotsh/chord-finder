import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SongList from "./components/SongList";
import SongView from "./components/SongView";
import SongEditor from "./components/SongEditor";
import FavoritesList from "./components/FavoritesList";
import { loadSongsFromGithub } from "./services/githubService";
import { getFavorites } from "./services/storageService";
import "./styles/App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const loadedSongs = await loadSongsFromGithub();
        setSongs(loadedSongs);

        const userFavorites = getFavorites();
        setFavorites(userFavorites);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header songs={songs} />
        <main className="main-content">
          {isLoading ? (
            <div className="loading">Loading songs...</div>
          ) : (
            <Routes>
              <Route path="/" element={<SongList songs={songs} />} />
              <Route path="/song/:id" element={<SongView />} />
              <Route path="/editor" element={<SongEditor />} />
              <Route
                path="/favorites"
                element={<FavoritesList favorites={favorites} />}
              />
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

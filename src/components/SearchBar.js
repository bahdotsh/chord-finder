import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchBar.css";

function SearchBar({ songs }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 2) {
      const filtered = songs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (song.tags &&
            song.tags.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase()),
            )),
      );
      setResults(filtered);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  const handleSelectSong = (id) => {
    setShowResults(false);
    navigate(`/song/${id}`);
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search for songs, artists, or chords..."
          value={query}
          onChange={handleSearch}
          onFocus={() => results.length > 0 && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
        <button className="search-button">
          <i className="search-icon">🔍</i>
        </button>
      </div>

      {showResults && results.length > 0 && (
        <div className="search-results">
          {results.map((song) => (
            <div
              key={song.id}
              className="search-result-item"
              onClick={() => handleSelectSong(song.id)}
            >
              <div className="result-title">{song.title}</div>
              <div className="result-artist">{song.artist}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

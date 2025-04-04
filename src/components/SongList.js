import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserSongs } from "../services/storageService";
import "../styles/SongList.css";

function SongList({ songs = [] }) {
  const [allSongs, setAllSongs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    // Combine GitHub songs with user-created songs
    const userSongs = getUserSongs();
    setAllSongs([...songs, ...userSongs]);
  }, [songs]);

  // Get all unique tags
  const allTags = [...new Set(allSongs.flatMap((song) => song.tags || []))];

  // Filter songs based on criteria
  const filteredSongs = allSongs.filter((song) => {
    if (selectedTag && (!song.tags || !song.tags.includes(selectedTag))) {
      return false;
    }

    if (filter === "github" && song.source !== "github") {
      return false;
    }

    if (filter === "user" && song.source !== "user") {
      return false;
    }

    return true;
  });

  return (
    <div className="song-list-container">
      <h1>Song Library</h1>

      <div className="filters">
        <div className="filter-group">
          <span>Source:</span>
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "github" ? "active" : ""}
            onClick={() => setFilter("github")}
          >
            GitHub
          </button>
          <button
            className={filter === "user" ? "active" : ""}
            onClick={() => setFilter("user")}
          >
            User Created
          </button>
        </div>

        {allTags.length > 0 && (
          <div className="tags-filter">
            <span>Tags:</span>
            <button
              className={selectedTag === null ? "active" : ""}
              onClick={() => setSelectedTag(null)}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={selectedTag === tag ? "active" : ""}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {filteredSongs.length === 0 ? (
        <div className="no-songs">
          <p>No songs found with the current filters.</p>
          <button
            onClick={() => {
              setFilter("all");
              setSelectedTag(null);
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="songs-grid">
          {filteredSongs.map((song) => (
            <div key={song.id} className="song-card">
              <h3>
                <Link to={`/song/${song.id}`}>{song.title}</Link>
              </h3>
              <p className="artist">{song.artist}</p>

              {song.tags && song.tags.length > 0 && (
                <div className="tags">
                  {song.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="song-card-footer">
                {song.source === "user" && (
                  <span className="source user-source">User Created</span>
                )}
                <Link to={`/song/${song.id}`} className="view-link">
                  View Chords
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="add-song-cta">
        <p>Don't see what you're looking for?</p>
        <Link to="/editor" className="add-song-btn">
          Add a New Song
        </Link>
      </div>
    </div>
  );
}

export default SongList;

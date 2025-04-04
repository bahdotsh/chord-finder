import React from "react";
import { Link } from "react-router-dom";
import { removeFromFavorites } from "../services/storageService";
import "../styles/FavoritesList.css";

function FavoritesList({ favorites = [] }) {
  const [localFavorites, setLocalFavorites] = React.useState(favorites);

  const handleRemove = (id) => {
    removeFromFavorites(id);
    setLocalFavorites((prevFavorites) =>
      prevFavorites.filter((song) => song.id !== id),
    );
  };

  if (localFavorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>Your Favorites</h2>
        <p>You haven't added any songs to your favorites yet.</p>
        <Link to="/" className="browse-btn">
          Browse Songs
        </Link>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <h2>Your Favorites</h2>

      <div className="favorites-grid">
        {localFavorites.map((song) => (
          <div key={song.id} className="favorite-card">
            <div className="favorite-info">
              <h3>
                <Link to={`/song/${song.id}`}>{song.title}</Link>
              </h3>
              <p className="artist">{song.artist}</p>

              {song.tags && song.tags.length > 0 && (
                <div className="tag-list">
                  {song.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="favorite-actions">
              <Link to={`/song/${song.id}`} className="view-btn">
                View
              </Link>
              <button
                onClick={() => handleRemove(song.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesList;

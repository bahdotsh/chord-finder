import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ChordDisplay from "./ChordDisplay";
import ShareModal from "./ShareModal";
import { getSongById } from "../services/githubService";
import {
  addToFavorites,
  removeFromFavorites,
  isInFavorites,
} from "../services/storageService";
import "../styles/SongView.css";

function SongView() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const fetchSong = async () => {
      setLoading(true);
      try {
        const songData = await getSongById(id);
        setSong(songData);
        setIsFavorite(isInFavorites(id));
      } catch (error) {
        console.error("Failed to fetch song:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, [id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(song);
    }
    setIsFavorite(!isFavorite);
  };

  if (loading) return <div className="loading">Loading song...</div>;
  if (!song) return <div className="error">Song not found</div>;

  return (
    <div className="song-view">
      <div className="song-header">
        <h1>{song.title}</h1>
        <div className="song-actions">
          <button
            onClick={toggleFavorite}
            className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
          <button onClick={() => setShowShareModal(true)} className="share-btn">
            Share
          </button>
        </div>
      </div>

      <div className="song-details">
        <p className="artist">By: {song.artist}</p>
        {song.tags && (
          <div className="song-tags">
            {song.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="song-content">
        <ChordDisplay content={song.content} />
      </div>

      {showShareModal && (
        <ShareModal song={song} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
}

export default SongView;

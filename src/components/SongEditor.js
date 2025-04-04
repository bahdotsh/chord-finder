import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadSong } from "../services/githubService";
import "../styles/SongEditor.css";

function SongEditor() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const songData = {
        title,
        artist,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        createdAt: new Date().toISOString(),
      };

      const songId = await uploadSong(songData);
      alert("Song successfully uploaded!");
      navigate(`/song/${songId}`);
    } catch (error) {
      console.error("Failed to upload song:", error);
      alert("Failed to upload song. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of the component remains the same
  return (
    <div className="song-editor">
      <h1>Create a New Song</h1>

      <div className="editor-tabs">
        <button
          className={!preview ? "active" : ""}
          onClick={() => setPreview(false)}
        >
          Edit
        </button>
        <button
          className={preview ? "active" : ""}
          onClick={() => setPreview(true)}
        >
          Preview
        </button>
      </div>

      {!preview ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Song Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="artist">Artist:</label>
            <input
              type="text"
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">
              Lyrics and Chords:
              <small>(Use [C], [Am], etc. to denote chords)</small>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="15"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">
              Tags:
              <small>(comma-separated)</small>
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="rock, acoustic, beginner"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Upload Song"}
          </button>
        </form>
      ) : (
        <div className="song-preview">
          <h2>{title || "Untitled"}</h2>
          <p className="artist-preview">By: {artist || "Unknown Artist"}</p>

          <div className="content-preview">
            {content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: content.replace(
                    /\[([^\]]+)\]/g,
                    '<span class="chord">$1</span>',
                  ),
                }}
              />
            ) : (
              <p className="empty-message">No content yet</p>
            )}
          </div>

          {tags && (
            <div className="tags-preview">
              {tags.split(",").map((tag, index) => (
                <span key={index} className="tag">
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SongEditor;

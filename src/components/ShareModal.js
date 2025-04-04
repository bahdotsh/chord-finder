import React, { useState } from "react";
import {
  shareViaEmail,
  shareViaTwitter,
  shareViaFacebook,
  getShareableLink,
} from "../services/shareService";
import "../styles/ShareModal.css";

function ShareModal({ song, onClose }) {
  const [copied, setCopied] = useState(false);
  const shareableLink = getShareableLink(song);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Share "{song.title}"</h2>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <div className="share-options">
          <button
            onClick={() => shareViaEmail(song)}
            className="share-btn email-btn"
          >
            Email
          </button>

          <button
            onClick={() => shareViaTwitter(song)}
            className="share-btn twitter-btn"
          >
            Twitter
          </button>

          <button
            onClick={() => shareViaFacebook(song)}
            className="share-btn facebook-btn"
          >
            Facebook
          </button>
        </div>

        <div className="share-link">
          <input
            type="text"
            value={shareableLink}
            readOnly
            onClick={(e) => e.target.select()}
          />
          <button onClick={copyToClipboard}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;

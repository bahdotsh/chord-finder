import React from "react";
import ReactMarkdown from "react-markdown";
import "../styles/ChordDisplay.css";

function ChordDisplay({ content }) {
  // Process the markdown content to highlight chords
  const processedContent = content.replace(
    /\[([^\]]+)\]/g,
    '<span class="chord">$1</span>',
  );

  return (
    <div className="chord-display">
      <div
        className="chord-content"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    </div>
  );
}

export default ChordDisplay;

import axios from "axios";

// Get the correct base URL for GitHub Pages deployment
const getBaseUrl = () => {
  // Check if we're in a GitHub Pages environment by looking at the URL
  const isGitHubPages = window.location.hostname.includes("github.io");
  // For GitHub Pages, use the repository name as the base path
  return isGitHubPages ? "/chord-finder" : "";
};

// Function to load songs from public folder
export const getSongById = async (id) => {
  try {
    // First check user-created songs (in localStorage)
    const userSongs = JSON.parse(localStorage.getItem("userSongs") || "[]");
    const userSong = userSongs.find((song) => song.id === id);

    if (userSong) {
      return {
        ...userSong,
        source: "user",
      };
    }

    // Get base URL for GitHub Pages or local development
    const baseUrl = getBaseUrl();
    const songPath = `${baseUrl}/songs/${id}.md`;

    console.log("Attempting to load song from:", songPath);

    try {
      const response = await axios.get(songPath);

      // Parse markdown content to extract metadata and content
      const content = response.data;
      const parsed = parseMarkdown(content);

      return {
        id,
        ...parsed,
        source: "github",
      };
    } catch (fetchError) {
      console.error(`Error fetching song ${id}:`, fetchError);
      throw fetchError; // Let the error propagate up
    }
  } catch (error) {
    console.error(`Failed to load song with ID ${id}:`, error);
    return null;
  }
};

export const loadSongsFromGithub = async () => {
  try {
    // Get base URL for GitHub Pages or local development
    const baseUrl = getBaseUrl();
    const indexPath = `${baseUrl}/songs/index.json`;

    console.log("Loading song index from:", indexPath);

    try {
      const response = await axios.get(indexPath);

      // Add source property to each song
      return response.data.map((song) => ({
        ...song,
        source: "github", // Mark as GitHub sourced
      }));
    } catch (fetchError) {
      console.error("Error fetching song index:", fetchError);
      throw fetchError;
    }
  } catch (error) {
    console.error("Failed to load songs:", error);
    return [];
  }
};

// Function to upload a new song (simulated for local testing)
export const uploadSong = async (songData) => {
  // Generate a song ID
  const id = generateSongId(songData.title);

  // For local testing, just store in localStorage
  const userSongs = JSON.parse(localStorage.getItem("userSongs") || "[]");
  const newSong = {
    id,
    ...songData,
    source: "user", // Mark as user-created
  };

  userSongs.push(newSong);
  localStorage.setItem("userSongs", JSON.stringify(userSongs));

  return id;
};

// Helper function to parse markdown content
function parseMarkdown(markdown) {
  const lines = markdown.split("\n");
  const metadata = {};
  let contentStart = 0;

  // Check for metadata header (YAML frontmatter)
  if (lines[0] === "---") {
    let i = 1;
    while (i < lines.length && lines[i] !== "---") {
      const match = lines[i].match(/^(\w+):\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        metadata[key] = value;
      }
      i++;
    }
    contentStart = i + 1;
  }

  const content = lines.slice(contentStart).join("\n");

  return {
    title: metadata.title || "Untitled",
    artist: metadata.artist || "Unknown",
    tags: metadata.tags ? metadata.tags.split(",").map((t) => t.trim()) : [],
    content,
  };
}

// Helper function to generate a song ID from title
function generateSongId(title) {
  return (
    title
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-") +
    "-" +
    Date.now().toString(36)
  );
}

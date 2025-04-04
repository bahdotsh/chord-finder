const FAVORITES_KEY = "chord-finder-favorites";

// Get all favorites from localStorage
export const getFavorites = () => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

// Check if a song is in favorites
export const isInFavorites = (songId) => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.id === songId);
};

// Add a song to favorites
export const addToFavorites = (song) => {
  const favorites = getFavorites();
  if (!isInFavorites(song.id)) {
    favorites.push(song);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

// Remove a song from favorites
export const removeFromFavorites = (songId) => {
  const favorites = getFavorites();
  const updated = favorites.filter((song) => song.id !== songId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

// Get user created songs
export const getUserSongs = () => {
  const songs = localStorage.getItem("userSongs");
  return songs ? JSON.parse(songs) : [];
};

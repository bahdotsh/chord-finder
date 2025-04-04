// Share song via email
export const shareViaEmail = (song) => {
  const subject = encodeURIComponent(
    `Check out this chord chart for "${song.title}" by ${song.artist}`,
  );
  const body = encodeURIComponent(
    `I found this chord chart for "${song.title}" by ${song.artist}.\n\n` +
      `Check it out: ${window.location.origin}${process.env.PUBLIC_URL}/song/${song.id}\n\n` +
      `Shared from Chord Finder`,
  );

  window.location.href = `mailto:?subject=${subject}&body=${body}`;
};

// Share song via Twitter
export const shareViaTwitter = (song) => {
  const text = encodeURIComponent(
    `Check out the chords for "${song.title}" by ${song.artist} on Chord Finder! ${window.location.origin}${process.env.PUBLIC_URL}/song/${song.id}`,
  );

  window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
};

// Share song via Facebook
export const shareViaFacebook = (song) => {
  const url = encodeURIComponent(
    `${window.location.origin}${process.env.PUBLIC_URL}/song/${song.id}`,
  );

  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
};

// Generate a shareable link
export const getShareableLink = (song) => {
  return `${window.location.origin}${process.env.PUBLIC_URL}/song/${song.id}`;
};

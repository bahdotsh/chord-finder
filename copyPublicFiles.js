const fs = require("fs-extra");
const path = require("path");

// This script ensures that the songs directory is copied to the build directory
async function copyFiles() {
  try {
    // Source path
    const songsSource = path.join(__dirname, "public", "songs");

    // Destination path (create build directory if it doesn't exist)
    fs.ensureDirSync(path.join(__dirname, "build"));
    const songsDestination = path.join(__dirname, "build", "songs");

    // Copy songs directory
    await fs.copy(songsSource, songsDestination);
    console.log("Songs directory successfully copied to build folder");
  } catch (err) {
    console.error("Error copying songs directory:", err);
  }
}

copyFiles();

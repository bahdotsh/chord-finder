const fs = require("fs-extra");
const path = require("path");

// Ensure the songs directory exists in build
const sourceSongsDir = path.join(__dirname, "public", "songs");
const buildSongsDir = path.join(__dirname, "build", "songs");

try {
  // Make sure the target directory exists
  fs.ensureDirSync(buildSongsDir);

  // Copy songs directory
  fs.copySync(sourceSongsDir, buildSongsDir, { overwrite: true });

  // Create a .nojekyll file to prevent GitHub Pages from ignoring files that start with underscore
  fs.writeFileSync(path.join(__dirname, "build", ".nojekyll"), "");

  console.log("Songs directory copied to build folder successfully!");

  // List the contents of the songs directory to verify
  const files = fs.readdirSync(buildSongsDir);
  console.log("Songs directory contents:", files);
} catch (err) {
  console.error("Error copying files:", err);
  process.exit(1);
}

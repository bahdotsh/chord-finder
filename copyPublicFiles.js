const fs = require("fs-extra");
const path = require("path");

// Define source and destination
const sourceDir = path.join(__dirname, "public", "songs");
const targetDir = path.join(__dirname, "build", "songs");

// Ensure the build directory exists
fs.ensureDirSync(path.join(__dirname, "build"));

// Copy the songs directory
try {
  fs.copySync(sourceDir, targetDir, { overwrite: true });
  console.log("Songs directory copied successfully!");
} catch (err) {
  console.error("Error copying songs directory:", err);
}

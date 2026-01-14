// loadMemes.js (or generateMemesJson.js)
import fs from "fs";
import path from "path";

const memesDir = path.join(process.cwd(), "public/memes");
const memeLibrary = {};

fs.readdirSync(memesDir).forEach((cat) => {
  const catPath = path.join(memesDir, cat);
  // ✅ Skip hidden files or non-directories like .DS_Store
  if (!fs.statSync(catPath).isDirectory()) return;

  const files = fs
    .readdirSync(catPath)
    .filter(
      (f) =>
        !f.startsWith(".") && // skip hidden files
        /\.(png|jpg|jpeg|gif|webp)$/i.test(f) // only image files
    );

  memeLibrary[cat] = files;
});

// Write to JSON file
fs.writeFileSync(
  path.join(process.cwd(), "public/memeLibrary.json"),
  JSON.stringify(memeLibrary, null, 2)
);

console.log("✅ Generated memeLibrary.json successfully!");

// // inspect-exif.js
// const fs = require('fs');
// const path = require('path');
// const exifParser = require('exif-parser');

// // Update this to the correct path to your image file
// const filePath = path.join(__dirname, "..",'public', 'uploads', 'TestImage.jpg');

// // Debugging: Log the full path to ensure it is correct
// console.log(`Reading file from: ${filePath}`);

// if (!fs.existsSync(filePath)) {
//   console.error('File does not exist:', filePath);
//   process.exit(1);
// }

// const buffer = fs.readFileSync(filePath);
// const parser = exifParser.create(buffer);
// const result = parser.parse();

// console.log(result);

// inspect-exif.js
const path = require('path');
const { exiftool } = require('exiftool-vendored');

// Go back one directory to access the 'public' directory
const filePath = path.join(__dirname, '..', 'public', 'uploads', 'TestImage.jpg');

// Debugging: Log the full path to ensure it is correct
console.log(`Reading file from: ${filePath}`);

if (!require('fs').existsSync(filePath)) {
  console.error('File does not exist:', filePath);
  process.exit(1);
}

async function inspectMetadata() {
  try {
    const metadata = await exiftool.read(filePath);
    console.log(metadata);
  } catch (error) {
    console.error(`Error reading metadata from ${filePath}:`, error);
  } finally {
    await exiftool.end();
  }
}

inspectMetadata();

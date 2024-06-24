import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import prisma from "../../lib/prismadb";

interface Metadata {
  tags: string[];
  categories: string[];
}

interface Entry {
  id: number;
  title: string;
  imageUrl: string;
  format: string;
  tags: string[];
  categories: string[];
  likeCounter: number;
  downloadCounter: number;
  createdAt: Date;
  updatedAt: Date;
}

// console.log('Environment Variables:', process.env.PATH);

function runPythonScript(filePath: string): Promise<Metadata> {
    const scriptPath = path.join('pyscripts', 'readMetaData.py');
  return new Promise((resolve, reject) => {
    execFile('python3', [scriptPath, filePath], (error, stdout, stderr) => {
      if (error) {
        console.error(`Error reading metadata from ${filePath}:`, error);
        return reject(error);
      }

      if (stderr) {
        console.error(`Stderr from reading metadata from ${filePath}:`, stderr);
        return reject(stderr);
      }

      try {
        const metadata = JSON.parse(stdout);
        console.log('Metadata from Python script:', metadata);

        // Convert metadata to required format
        const userComment = metadata.UserComment ? metadata.UserComment : '';
        const imageDescription = metadata.ImageDescription ? metadata.ImageDescription : '';

        const tags = userComment ? userComment.split(',') : [];
        const categories = imageDescription ? imageDescription.split(',') : [];

        resolve({ tags, categories });
      } catch (parseError) {
        console.error(`Error parsing metadata from ${filePath}:`, parseError);
        reject(parseError);
      }
    });
  });
}

export async function saveImageData() {
  console.log('Starting saveImageData function');
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

  const entries: Entry[] = [];
  const files = fs.readdirSync(uploadsDir);

  for (const file of files) {
    const filePath = path.join(uploadsDir, file);
    console.log(`Processing file: ${filePath}`);

    // Exclude .DS_Store and other non-image files
    if (fs.lstatSync(filePath).isFile() && !filePath.endsWith('.DS_Store')) {
    //   console.log(`Reading metadata for file: ${filePath}`);
      try {
        const { tags, categories } = await runPythonScript(filePath);
        tags.shift();
        console.log(`Metadata for file ${filePath}:`, { tags, categories });

        const relativePath = path.relative(process.cwd(), filePath);
        const format = path.extname(file).slice(1); // Extract format from file extension
        const title = path.basename(file, path.extname(file)); // Use filename without extension as title

        // console.log(`Saving image data to database for file: ${filePath}`);
        const image = await prisma.image.create({
          data: {
            title,
            imageUrl: relativePath,
            format,
            tags,
            categories,
            likeCounter: 0,
            downloadCounter: 0,
          },
        });
        entries.push(image);
      } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
      }
    }
  }
  console.log('Finished saveImageData function');

  return entries;
}


import fs from "fs";
import path from "path";
import sharp from "sharp";
import {exec} from "child_process"

// const optimisedDir = path.join(__dirname, "public", "optimised");

export async function processImages(directory: string): Promise<void> {
    return new Promise((resolve, reject) => {
        exec(`python3 pyscripts/optimizeImage.py ${directory}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error optimizing images: ${error.message}`);
                return reject(error);
            }
            if (stderr) {
                console.error(`Error optimizing images: ${stderr}`);
                return reject(new Error(stderr));
            }
            console.log(stdout);
            resolve();
        });
    });
}
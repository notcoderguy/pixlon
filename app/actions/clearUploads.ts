import { exec } from 'child_process';
import path from 'path';

export const clearUploads = async (directory: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join('pyscripts', 'clearUploads.py');
        exec(`python3 ${scriptPath} ${directory}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing Python script: ${error}`);
                console.error(`stderr: ${stderr}`);
                reject(error);
                return;
            }
            console.log(`stdout: ${stdout}`);
            resolve();
        });
    });
};

import {readdir, readFile} from 'fs/promises';
import fse from 'fs-extra';
import path from 'path';
import fs from 'fs';

export const readFileContent = async (filePath) => {
    try {
        return await readFile(filePath, 'utf8');
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}
export const iterateFolders = async (folderPath) => {
    try {
        // Read the contents of the current folder
        const entries = await readdir(folderPath, {withFileTypes: true});

        // Iterate through each entry in the folder
        for (const entry of entries) {
            if (entry.name.startsWith('-')) continue;
            const fullPath = path.join(folderPath, entry.name);

            if (entry.isDirectory()) {
                console.log('Folder:', fullPath, '\t', entry.name);
                // Recursively iterate through subfolders
                await iterateFolders(fullPath);
            } else {
                console.log('File:', fullPath, '\t', entry.name);
            }
        }
    } catch (err) {
        console.error('Error reading folder:', err);
    }
}

export const copyAllFolders = async (sourceDir, destDir) => {
    try {
        // Ensure the destination directory exists
        await fse.ensureDir(destDir);

        // Read the contents of the source directory
        const items = await fs.promises.readdir(sourceDir, {withFileTypes: true});

        // Filter out directories
        const folders = items.filter(item => item.isDirectory());

        // Copy each folder
        for (const folder of folders) {
            const sourcePath = path.join(sourceDir, folder.name);
            const destPath = path.join(destDir, folder.name);

            await fse.copy(sourcePath, destPath, {overwrite: true});
            console.log(`Successfully copied ${sourcePath} to ${destPath}`);
        }

        console.log('All folders copied successfully');
    } catch (err) {
        console.error(`Error copying folders: ${err}`);
    }
}
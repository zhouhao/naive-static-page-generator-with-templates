import {readdir, readFile} from 'fs/promises';
import fse from 'fs-extra';
import path from 'path';
import fs from 'fs';

export const readFileContent = async (filePath) => {
    try {
        return await readFile(filePath, 'utf8');
    } catch (error) {
        return ""
    }
}

export const findSubFolders = async (folderPath) => {
    try {
        const result = []
        const entries = await readdir(folderPath, {withFileTypes: true});
        for (const entry of entries) {
            if (entry.name.startsWith('_') || !entry.isDirectory()) continue;
            const fullPath = path.join(folderPath, entry.name);
            result.push(fullPath);
        }
        return result
    } catch (err) {
        console.error('Error reading folder:', err);
        return []
    }
}

export const findHtmlFiles = async (folderPath) => {
    try {
        const result = []
        const entries = await readdir(folderPath, {withFileTypes: true});
        for (const entry of entries) {
            if (entry.name.startsWith('_') || entry.isDirectory() || !entry.name.endsWith('.html')) continue;
            const fullPath = path.join(folderPath, entry.name);
            result.push(fullPath);
        }
        return result
    } catch (err) {
        console.error('Error reading folder:', err);
        return []
    }
}

export const copyAllFolders = async (sourceDir, destDir) => {
    try {
        await fse.ensureDir(destDir);
        const items = await fs.promises.readdir(sourceDir, {withFileTypes: true});
        const folders = items.filter(item => item.isDirectory());
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

const removePrefixAndSuffix = (str, prefix, suffix) => {
    str = str.trim();
    if (str.startsWith(prefix)) {
        str = str.slice(prefix.length);
    }
    if (str.endsWith(suffix)) {
        str = str.slice(0, -suffix.length);
    }
    return str;
}

const divideString = (str) => {
    if (!str.startsWith('<!--')) {
        return ['', str];
    }

    const lines = str.split(/\r?\n/);
    const [firstLine, ...rest] = lines;
    const restOfString = rest.join('\n');
    const sanitizedFirstLine = removePrefixAndSuffix(firstLine, "<!--", "-->").trim()
    return [sanitizedFirstLine, restOfString];
}

export const parseContent = async (filePath) => {
    const content = await readFileContent(filePath);
    return divideString(content);
}

export const saveStringAsFile = async (content, filePath) => {
    const directory = path.dirname(filePath);

    await fs.mkdir(directory, {recursive: true}, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
            return;
        }
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log(filePath + ' saved successfully!');
            }
        });
    })
}

export const replacePrefix = (str, oldPrefix, newPrefix) => {
    if (str.startsWith(oldPrefix)) {
        return newPrefix + str.slice(oldPrefix.length);
    }
    return str;
}
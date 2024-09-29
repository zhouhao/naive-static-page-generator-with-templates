import Handlebars from "handlebars";

import {readdir, readFile} from 'fs/promises';
import {join} from 'path';

async function readFileContent(filePath) {
    try {
        return await readFile(filePath, 'utf8');
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}

async function iterateFolders(folderPath) {
    try {
        // Read the contents of the current folder
        const entries = await readdir(folderPath, {withFileTypes: true});

        // Iterate through each entry in the folder
        for (const entry of entries) {
            if (entry.name.startsWith('-')) continue;
            const fullPath = join(folderPath, entry.name);

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

// Specify the root folder to start iteration
const rootFolder = './src';

// IIFE to use top-level await
(async () => {
    await iterateFolders(rootFolder);
})();

const source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
    "{{kids.length}} kids:</p>" +
    "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
const template = Handlebars.compile(source);

const data = {
    "name": "Alan", "hometown": "Somewhere, TX",
    "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]
};
console.log(template(data));


import Handlebars from "handlebars";
import {
    copyAllFolders,
    findHtmlFiles,
    findSubFolders,
    parseContent,
    readFileContent, replacePrefix,
    saveStringAsFile
} from './utils.js';

const rootFolder = './src';

// IIFE to use top-level await
(async () => {
    const head = await readFileContent('src/_partial/head.handlebars');
    const header = await readFileContent('src/_partial/header.handlebars');
    const footer = await readFileContent('src/_partial/footer.handlebars');
    const layout = await readFileContent('src/layout.handlebars');
    Handlebars.registerHelper('date', function (date, format) {
        return new Date().getFullYear();
    });

    Handlebars.registerPartial('head', head);
    Handlebars.registerPartial('header', header);
    Handlebars.registerPartial('footer', footer);
    const template = Handlebars.compile(layout, {noEscape: true});

    await copyAllFolders(rootFolder + '/_assets', 'public')

    const folders = [rootFolder, ...(await findSubFolders(rootFolder))]
    await generateHtmlFiles(folders, template);

    await complete();

})();

const generateHtmlFiles = async (folders, template) => {
    for (const folder of folders) {
        const beforeContent = await readFileContent(folder + '/_before.html', 'utf8');
        const afterContent = await readFileContent(folder + '/_after.html', 'utf8');
        const htmlFiles = await findHtmlFiles(folder);
        for (const file of htmlFiles) {
            const [title, content] = await parseContent(file);
            const htmlContent = template({
                title: title,
                content: beforeContent + content + afterContent,
            })
            await saveStringAsFile(htmlContent, replacePrefix(file, 'src', 'public'));
        }
    }
}

const complete = async () => {
    console.log("All pages have been generated! 🎉");
}

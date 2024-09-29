import Handlebars from "handlebars";
import {copyAllFolders, readFileContent} from './utils.js';

const rootFolder = './src';

// IIFE to use top-level await
(async () => {
    // await iterateFolders(rootFolder);
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

    const data = {
        'content': '<p>Hello</p>',
        'title': 'My Page',
    };
    console.log(template(data));

    await copyAllFolders('src/_assets', 'public')

})();

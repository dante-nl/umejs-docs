const ume = require('@dantenl/umejs');
const express = require('express');
const path = require('path');
const fs = require("fs")
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const jsBeautify = require('js-beautify');

const app = express();
const PORT = 9418

const umeConfig = ume({
    contentDir: path.join(__dirname, 'v1'),
    templatePath: path.join(__dirname, 'v1', 'layout-v1.ume.html'),
    partialsDir: path.join(__dirname, 'v1', 'partials'),
    mode: 'production',

    // extra helpers that run on every request
    helpers: {
        year: {
            cache: true,
            helper: () => new Date().getFullYear()
        },
        sidebar: {
            cache: true,
            helper: buildSidebar
        },
        time: {
            cache: false,
            helper: (slug) => {
                return new Date().toLocaleTimeString();
            },
        },
        path: (req, res, slug) => {
            return `/v1/${slug}`;
        },
        unix: () => { return + new Date() },
        buildTime: {
            cache: true,
            helper: () => { return new Date().toUTCString() }
        }
    },
    builders: [
        buildFancyBlockquote,
        prettify
    ],
});

/**
 * Construct the sidebar from the sidebar.json file
 * @param {string} slug 
 * @returns {string} The generated sidebar 
 */
function buildSidebar(slug) {
    const templateFile = fs.readFileSync(__dirname + "/v1/sidebar.json")
    const templateJSON = JSON.parse(templateFile)

    let sidebar = ""
    templateJSON.forEach(sidebarElement => {
        if(!("subelements" in sidebarElement)) {
            // simple sidebar without any sub things
            sidebar += `<li><span class="bullet-filled"></span> <a href="${sidebarElement.link}">${sidebarElement.title}</a></li>`
        } else {
            // complicated sidebar with subelements
            let subelementList = ``
            sidebarElement.subelements.forEach(subelement => {
                subelementList += `<li><a href="${subelement.link}">${subelement.title}</a></li>`
            });
            sidebar += `<li><span class="bullet-filled"></span> <a href="${sidebarElement.link}">${sidebarElement.title}</a><ul>${subelementList}</ul></li>`
        }
    });

    const html = `<ul class="tree">${sidebar}</ul>`
    return html
}

function buildFancyBlockquote(req, res, slug, html) {
    // convert regular old blockquotes to fancy ones when prefixed correctly
    // in line with https://github.com/orgs/community/discussions/16925 
    // i know it could technically be on the page itself, but it's more fun this way isn't it?
    const dom = new JSDOM(html)
    const document = dom.window.document
    
    const blockquotes = document.querySelectorAll("blockquote")
    blockquotes.forEach(blockquote => {
        blockquote = manageBlockquote(blockquote, "note", "fa-solid fa-circle-info")
        blockquote = manageBlockquote(blockquote, "tip", "fa-solid fa-lightbulb")
        blockquote = manageBlockquote(blockquote, "important", "fa-solid fa-exclamation")
        blockquote = manageBlockquote(blockquote, "warning", "fa-solid fa-triangle-exclamation")
        blockquote = manageBlockquote(blockquote, "caution", "fa-solid fa-circle-exclamation")
    });

    return dom.serialize()
}

/**
 * If the first p element inside of a blockquote starts with `[!TYPE]`, add `type` as classname and remove `[!TYPE]`.
 * @param {HTMLElement} blockquote The blockquote to check for a specific note
 * @param {string} type The type you wish to replace
 * @param {string} icon The class of the FontAwesome icon to include
 * @returns {HTMLElement} Returns the updated blockquote
 */
function manageBlockquote(blockquote, type, icon) {
    let blockquoteText = (blockquote.querySelector("p"))
    if (blockquoteText.innerHTML.startsWith(`[!${type.toUpperCase()}]`)) {
        blockquoteText.innerHTML = blockquoteText.innerHTML.replace(`[!${type.toUpperCase()}]`, "")
        blockquote.classList.add(type.toLowerCase())
        blockquote.insertAdjacentHTML("afterbegin", `<p class="${type}-text"><i class='${icon}'></i>${toTitleCase(type)}</p>`)
    }
    return blockquote
}
/**
 * Converts A String To Title Case
 * @param {string} str String to convert
 * @returns 
 */
function toTitleCase(str) {
    return str.split(' ')
        .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
        .join(' ');
}

function prettify(req, res, slug, html) {
    // code generated with umejs can sometimes be a bit messy
    // this is thanks to including all different files and such, to remedy this, we can beautify the code using a builder
    return jsBeautify.html(html, {
        indent_size: 2,
        indent_char: ' ',
        max_preserve_newlines: 1,
        preserve_newlines: true,
        wrap_line_length: 0
    });
}

// // app.use(express.json())

// init docs with umejs
app.use('/v1/{*slug}', umeConfig);

// make everything from /public accessible
app.use(express.static(__dirname + '/public', { extensions: ['html'] }));

app.get('/', (req, res) => {
    res.redirect(301, "/v1/")
});

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/public/404.html")
});

// Error handling
const errorHandler = require('./errorHandler');
app.use(errorHandler);


// ----- Start the server -----
console.log()
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
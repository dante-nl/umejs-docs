---
title: Configuration
---

Here's the full configuration for ume. You can utilise the sidebar to navigate to individual pages to learn more about them and to view examples. Comments that are prefixed with `?` are optional keys.

```js
const ume = require("@dantenl/umejs")
ume({
    contentDir: "", // location of .md files
    templatePath: "", // path to a template file
    partialsDir: "", // ? directory with partials
    mode: "production" | "development", // ? manages live rebuilding; default is "production"
    verbose: false, // ? extra output logged to the console
    quiet: false, // ? no output to the console, except errors
    notFoundPath: "/public/404.html", // ? path to a 404 page
    nextUsage: false, // ? should umejs call express next() when encountering a 404 or 500 error?
    
    // ? custom markdown parsers, these get given the full markdown and should return markdown or html
    parsers: [
        (markdown) => { return markdown.replace("> time", "> 12:48") }
    ]
    // ? extra helpers for custom variables, can either be a cache or built on load
    helpers: {
        buildTime: {
            cache: true,
            helper: (slug) => {
                return new Date().toLocaleTimeString();
            },
        },
        path: (req, res, slug) => {
            return `/v1/${slug}`;
        }
    },

    // ? custom builders that get the full html and are executed just before page serve
    builders: [
        (req, res, slug, html) => {
            return html.replace("foo", "bar")
        }
    ]

});
```
---
title: "{_SLUG}"
edited: 2026-07-02
---

umejs supports custom builders, special helper functions that don't need to be incantated by a variable and run on every request. These builder functions can shape final HTML completely to their liking. This can break websites completely, or turn them into what you're seeing now.

Here's how to use it in your project:

```js
const ume = require("@dantenl/umejs")
const path = require('path');
const umeConfig = ume({
    builders: [
        myBuilder
    ]

    // example contentDir and templatePath
    contentDir: path.join(__dirname, 'content'),
    templatePath: path.join(__dirname, 'layout.ume.html'),
})

function myBuilder(req, res, html) {
    return html.replace("foo", "bar")
}
```

You can do quite a lot with builders. umejs gives you the HTML and slug (and the Express `req` and `res`) and if your function returns a string, it will output that as the HTML. You could potentially:
* Clean up the page's source code using [js-beautify](https://www.npmjs.com/package/js-beautify)
* Modify certain elements using [jsdom](https://www.npmjs.com/package/jsdom)
* Minimise the source code using [minify](https://www.npmjs.com/package/minify)

The first two are already put into practice on this documentation site! Here's an example on how to create the first one.

```js
// First, we need to import what we need
const ume = require('@dantenl/umejs');
const express = require('express');
const path = require('path');
const jsBeautify = require('js-beautify');

// We'll then set up Express and umejs
const app = express();
const PORT = 3000

const umeConfig = ume({
    // Define our content directory and template path
    contentDir: path.join(__dirname, 'content'),
    templatePath: path.join(__dirname, 'layout.ume.html'),

    // Tell umejs we want to have a builder
    builders: [
        beautify
    ]
});

// Define our prettify function
function beautify(req, res, slug, html) {
    // Call the jsBeautify function and return it
    // jsBeautify returns the HTML as a string, which is perfect because that's what umejs takes
    return jsBeautify.html(html, {
        indent_size: 2,
        indent_char: ' ',
        max_preserve_newlines: 1,
        preserve_newlines: true,
        wrap_line_length: 0
    });
}

// Define where we wish umejs to be accessible
app.use('/content/{*slug}', umeConfig);

// Turn on the Express server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

All our code is now automatically properly indented!
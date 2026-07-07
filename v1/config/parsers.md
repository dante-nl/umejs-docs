---
title: "{_SLUG}"
edited: 2026-07-07
min-version: 1.2.0
---

> [!NOTE]
> You need version `{min-version}` or newer.

With umejs, you can add custom things to your Markdown by adding a parser. This is a function that gets parsed a string containing the full Markdown document at start up and should return a Markdown-compatible string, which means it can contain things like HTML and JS. After this step, umejs will parse your string.  

Here's a very quick and dirty example that replaces
> fish

with:

# FISH!

```js
const ume = require("@dantenl/umejs")
const path = require('path');
const umeConfig = ume({
    parsers: [
        (markdown) => { return markdown.replace("> fish", "# FISH!")}
    ]

    // example contentDir and templatePath
    contentDir: path.join(__dirname, 'content'),
    templatePath: path.join(__dirname, 'layout.ume.html'),
})
```

Of course you can make this as simple or advanced as you wish. As long as it returns a string, it will be fine.
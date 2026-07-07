---
title: "{_SLUG}"
edited: 2026-07-1
---

`contentDir` is the bread and butter of umejs. By defining it, you tell umejs where to find the Markdown files. Here's quick example using `fs` (default in Node) to automatically get the full path of the project directory. This should basically be a foolproof method.

```js
const ume = require("@dantenl/umejs")
const path = require('path');
ume({
    contentDir: path.join(__dirname, 'blog'),
    // ! you'll also need to define templatePath if you want a valid umejs config!
})
```

With the current code, umejs will start looking within this directory. Here's an example directory:

```
.
├── blog/
│   ├── 2026/
│   │   └── welcome.md
│   └── index.md
├── index.js
├── package.json
└── package-lock.json
```

Both `index.md` and `2026/welcome.md` will be made accessible by umejs.
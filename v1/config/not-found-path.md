---
title: "{_SLUG}"
edited: 2026-07-02
---

If you define `notFoundPath`, umejs will automatically serve your 404 page. If you do not, umejs will instead serve a very rudimentary 404 page. The 404 page should be built in HTML and it does not support umejs variables. This could be the path to your generic 404 page, or you could make an entirely new one. It's up to you.

```js
const ume = require("@dantenl/umejs")
const path = require('path');
const umeConfig = ume({
    notFoundPath: path.join(__dirname, 'public', '404.html'),

    // example contentDir and templatePath
    contentDir: path.join(__dirname, 'content'),
    templatePath: path.join(__dirname, 'layout.ume.html'),
})
```
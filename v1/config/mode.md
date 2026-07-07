---
title: "{_SLUG}"
edited: 2026-07-2
---

When writing some files out locally and wanting to preview everything, it can be a bit annoying having to restart the server every time you've fixed a typo or want to see how it looks. umejs can alleviate the pain a bit! When creating files locally, you can enable `development` mode.

> [!WARNING]  
> It is not recommended to set the mode to `development` in production!

Here's en example config of umejs with the mode set to `development`:

```js
const ume = require("@dantenl/umejs")
const path = require('path');
const umeConfig = ume({
    mode: "development", 
    // "production" is default

    // example contentDir and templatePath
    contentDir: path.join(__dirname, 'content'),
    templatePath: path.join(__dirname, 'layout.ume.html'),
})
```

The default value is `production`.

If you wish to, you could also automatically change this with for example your `.env` file. For this example, the npm module [dotenv]() is used.

```js
// --- Import Express and umejs ---
const ume = require('@dantenl/umejs');
const express = require('express');
const path = require('path');

// --- Add .env ---
require('dotenv').config({ quiet: true})

// --- Initialise Express ---
const app = express();
const PORT = 3000

// --- Set dev mode ---
const DEV_MODE = process.env.DEV_MODE ? "development" : "production"
// if true, set string to "development". if not: "production"

// --- Initialise umejs ---
const umeConfig = ume({
    contentDir: path.join(__dirname, 'blog'),
    templatePath: path.join(__dirname, 'template', 'layout.ume.html'),
    mode: DEV_MODE
});

// --- Set up the umejs middleware ---
app.use('/blog/{*slug}', umeConfig);

// --- Get the server running ---
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

Your `.env` file would look like this:
```
DEV_MODE = true
```
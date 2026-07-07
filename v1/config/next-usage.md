---
title: "{_SLUG}"
edited: 2026-07-07
min-version: 1.2.0
---

> [!NOTE]
> You need version `{min-version}` or newer.

With umejs, you have various ways of handling a 404 error. You can either define create a [404.md](/v1/index-and-404) file, define a [notFoundPath](/v1/config/not-found-path), or simply choose to do nothing, where umejs will automatically serve a very basic error page.

However, with `nextUsage` set to true, umejs will automatically call Express' [next()](https://sitecite.dantenl.com/l/xshia) function. This will parse the request back to you, where you can define a custom error page or a custom error parser.

Here's a simply example on how you can define a custom 404 procedure:

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

// --- Initialise umejs ---
const umeConfig = ume({
    contentDir: path.join(__dirname, 'blog'),
    templatePath: path.join(__dirname, 'template', 'layout.ume.html'),
    nextUsage: true
});

// --- Set up the umejs middleware ---
app.use('/blog/{*slug}', umeConfig);

// --- Define the 404 page ---
app.use((req, res) => {
    console.log("Someone accessed a non-existant page ):");
    res.status(404).sendFile(__dirname + "/public/404.html");
});

// --- Get the server running ---
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```
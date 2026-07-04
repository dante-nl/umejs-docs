---
title: index.md and 404.md
edited: 2026-07-03
---

There are two special filenames in umejs. These are the only two files that can be visited without typing the specific slug. 

## index.md

Similar to an `index.html` file on your websites, an `index.md` file is automagically served when a user visits your umejs endpoint without typing a file name. In the case of this documentation site, going to `/v1/`, umejs will serve you the contents from the `index.md` file. Here's how you could use it in your project:

```js
const ume = require('@dantenl/umejs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const umeConfig = ume({
    contentDir: path.join(__dirname, 'content'),
    templatePath: path.join(__dirname, 'layout.ume.html'),
})

app.use('/blog/{*slug}', umeConfig);
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

```md
<!-- content/index.md -->
# Welcome to the project!
```

If you define an actual `layout.ume.html`, umejs will automatically serve your `index.md` when people visit `http://localhost:3000/blog/`. A setup is also available on the docs server. Try visiting [../v1/](../v1/) and [../v1/index](../v1/index). As you can see, both links have a different URL, but are serve the same content.

## 404.md

With umejs, you can choose to serve your own HTML file (read [/config/notFoundPath](./config/notFoundPath) to learn more) or you can serve a Markdown file. (You can technically choose not to handle it and umejs will serve a very basic page.)

Similar to the `index.md` file, we just have to create a `404.md` file in the content directory. This will be served when the user requests a slug that can not be found.

> [!NOTE]
> If you have `notFoundPath` defined in your config, the `404.md` will be ignored in favour of the selected HTML page.

## File structure

By combining both `index.md` and `404.md`, you may get a file structure that looks something similar to the following:

```
.
├── content/
│   ├── june/
│   │   └── why-heatwaves-suck.md
│   ├── index.md
│   └── 404.md
├── index.js
├── layout.ume.html
├── package-lock.json
└── package.json
```
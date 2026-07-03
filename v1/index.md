---
title: Welcome to umejs!
edited: 2026-07-02
---

## Express.js Markdown parser, with some sweet features!

umejs is a simple to use Markdown engine, allowing you to easily make static sites in your Express project. Great for documentation, a blog, or anything else where you'd want to serve simple webpages. Need an example of what umejs can be capable of? **This website has been made using umejs.**

# Features

Some features include:

* Easy to use
* Markdown with frontmatter
* Include other files using partials
* Dynamic request helpers and custom builders

# Launching your site

> [!TIP]
> For more detailed instructions, visit the [Quick start](quick-start) page!

You can install it using npm!

```
npm install @dantenl/umejs
```

You can then start up a simple webserver!

```js
const express = require('express');
const ume = require('@dantenl/umejs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use('/blog/{*slug}', ume({
    contentDir: path.join(__dirname, 'content'),
    templatePath: path.join(__dirname, 'layout.ume.html'),
}));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
```

You can now put your Markdown files in a directory named `content`! You'll need a simple template though, basically the wrapper for your Markdown.

```html
<!-- layout.ume.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\{_SLUG}</title>
</head>
<body>
    \{_BODY}
</body>
</html>
```

This is all you need to get your project running!
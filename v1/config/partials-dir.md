---
title: "{_SLUG}"
edited: 2026-07-2
---

The partials directory is, as the name implies, the directory where your partials are stored. Partials are a way to import files in your umejs template or Markdown files. Here's a quick example on how to use partialsDir in your configuration:

```js
const path = require('path');
const umeConfig = ume({
    partialsDir: path.join(__dirname, 'partials'),

    // example contentDir and templatePath
    contentDir: path.join(__dirname, 'content'),
    templatePath: path.join(__dirname, 'layout.ume.html'),
})
```

Partials can be incredibly powerful, especially for creating a layout. You can reference a footer for example, or a sidebar in your `layout.ume.html` file. Here's a simplified version of the `layout.ume.html` file that is used for this documentation site:

```html
<!-- layout.ume.html -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\{title} | umejs</title>

    <link rel="stylesheet" href="/style.css">
</head>

<body>
    \{_INCLUDE("header.ume.html")}
    <main>
        <div class="sidebar">
            \{sidebar}
        </div>
        <div class="article-wrapper">
            <article>
                <h1 class="title">\{title}</h1>
                {_BODY}
            </article>

            \{_INCLUDE("footer.ume.html")}
        </div>
    </main>

    <script src="/article.js"></script>
</body>

</html>
```

As you can see, there are plenty of `{_INCLUDE()}` statements. Let's examine the source code of `footer.ume.html` further. For reference: here's what our current file structure looks like:
```
.
├── content/
│   └── index.md
├── partials/
│   ├── footer.ume.html
│   └── header.ume.html
├── index.js
├── layout.ume.html
└── package.json
```

The key for making partials is to keep the code simple. As a reminder, they're not full webpages. They aren't meant to be viewed independantly. They're only for making the template file a bit easier to manage and to containerise the entire process a bit. With that said, here's what the `footer.ume.html` file looks like:

```html
<footer>
    <p>&copy; \{year} - powered by <strong>ume</strong> (untitled markdown engine)</p>
</footer>
```

The `\{year}` variable is a custom variable defined as a helper and returns the current year. If you wish to learn more about how to this, check out [helpers](helpers).
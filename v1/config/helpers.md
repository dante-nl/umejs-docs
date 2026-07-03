---
title: "{_SLUG}"
edited: 2026-07-02
---

umejs is quite flexible. You can define custom variables using frontmatter and use them anywhere within umejs. These variables are quite static though. **Using helper functions, you can make your own.** You can build them every time a page is loaded or have them cached by umejs, it's up to you. Here's a basic example of a function that returns the current UNIX time:

```js
const path = require('path');
const umeConfig = ume({
    helpers: {
        unix: () => { return + new Date() }
    }

    // example contentDir and templatePath
    contentDir: path.join(__dirname, 'content'),
    templatePath: path.join(__dirname, 'layout.ume.html'),
})
```

We can try it out quite easily. All we have to do is place `\{unix}` in an umejs file and it will be included! This function also exists on this documentation site. Here's the current UNIX time: `{unix}`. You can reload the page and it will update!

If you have a simple function that does not require live reloading, it may be more efficient to cache this, using the following format. For this example, a date will be cached to display when the file was built.

```js
const path = require('path');
const umeConfig = ume({
    helpers: {
        buildTime: {
            cache: true,
            helper: () => { return new Date().toUTCString() }
        }
    }

    // example contentDir and templatePath
    contentDir: path.join(__dirname, 'content'),
    templatePath: path.join(__dirname, 'layout.ume.html'),
})
```

Again, you can simply put `\{buildTime}` in your content and it will magically work! This function also works on this website. The file was built on `{buildTime}`. You can refresh the page, but the date will stay the same!

You can do even more advanced stuff with this though! umejs will pass the Express `req` and `res` options and the `slug`. The slug is basically just the filename, in this instance the slug would be `{_SLUG}`.

> [!NOTE]
> When you've set `cache` to true, the variable is built on start up, not on request. This means there are no `req` or `res` objects to be passed.

Here's an example using the more advanced inputs:

```js
const path = require('path');
const umeConfig = ume({
    helpers: {
        url: getUrl
    }

    // example contentDir and templatePath
    contentDir: path.join(__dirname, 'content'),
    templatePath: path.join(__dirname, 'layout.ume.html'),
})

function getUrl(req, res, slug) {
    return req.protocol + '://' + req.host + req.originalUrl;
}
```

Again, it works just like any other variable and can be called using `\{url}`.
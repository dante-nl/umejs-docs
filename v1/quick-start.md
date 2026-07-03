---
title: Quick start
---

Getting started with building using umejs is quite easy.

# Short version

You'll need Express and umejs to get started:

```
npm install @dantenl/umejs
npm install express
```

Then, in your primary JS file (main, server, index) you'll want to get your server running and umejs running with something like this:

```js
// server.js
// import
const ume = require('@dantenl/umejs');
const express = require('express');
const path = require('path'); // this is a default module

// init express
const app = express();
const PORT = 3000

// init umejs
const umeConfig = ume({
    contentDir: path.join(__dirname, 'blog'),
    templatePath: path.join(__dirname, 'layout.ume.html'),
});

// define path
app.use('/blog/{*slug}', umeConfig);

// start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

You'll then want to create a `layout.ume.html`. This is basically the wrapper of your Markdown. It can be as simple as this:

```html
<!-- layout.ume.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My blog!</title>
</head>
<body>
    {_BODY}
</body>
</html>
```

You're now able to create Markdown files in a directory named `blog` and when you run `node index.js` your created Markdown files are available at `http://localhost:3000/blog/<file name>`.

# Long version

If you're less experienced with Node or if you just want to copy and paste to get your new project running, this is the place.

## Ingredients (what you'll need)

There are a few things you'll need in order to get your project off the ground. You'll need:

* A recent version of [Nodejs](https://nodejs.org/). For this tutorial, `v22` is used
* A basic understanding of Nodejs and coding in general

## Step 1: Initialising your project

To get started, you'll need to create a new directory (folder) where you'll want to place your site. You can do this via your favourite file manager or simply using the terminal.
```
mkdir my-ume-site
cd my-ume-site
```

When you're in the folder, you then need to initialise Node. You can do that by simply running:
```
npm init -y
```

This will create a `package.json` file for you. The contents of this file are not terribly important for this guide. Once you've done that, there are two main things you need: Express and umejs.

## Step 2: Installing required resources

Express is what's used for creating your webserver. It's quite useful and is used for a variety of things. For now, we won't be looking at it too much. You can install it using npm:
```
npm install express
```

Secondly, we'll of course need umejs! Similar to express, you'll need to install it using npm:
```
npm install @dantenl/umejs
```

## Step 3: Getting Express running

Next, we'll need to get a basic Express project running. For this, we'll create a new file called `index.js` and we're going to put the following code in:

```js
// --- Import Express and umejs ---
const ume = require('@dantenl/umejs');
const express = require('express');
const path = require('path'); // this is a default module

// --- Initialise Express ---
const app = express();
const PORT = 3000

// --- Initialise umejs ---
const umeConfig = ume({
    contentDir: path.join(__dirname, 'blog'),
    templatePath: path.join(__dirname, 'template', 'layout.ume.html'),
    // the config can be a bit more complex, read the docs!
});

// --- Set up the umejs middleware ---
app.use('/blog/{*slug}', umeConfig);

// --- Get the server running ---
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

These are the basics, though it's not done yet! We'll need to create three more files, one for each of the first two options in the config (`contentDir` and `templatePath`)

## Step 4: Setting up the files

First, let's tackle the `contentDir`. This is the folder where you can place all the Markdown files. We need to create the folder and we'll also create a first file so we can try it out later.

We'll create a file called `hello.md` and we'll place it in a directory named `blog`. This can be whatever you want, though you'll need to change it in the configuration as well.
```md
---
title: First blog
---

<!-- /blog/hello.md -->

# Hello from ume!
```

Finally, we need a template. This is basically the HTML wrapper; the thing where our Markdown will live in. We'll create a new directory called `template` and a file named `layout.ume.html`. You can name this whatever you want, though again, you will need to update your configuration accordingly. The standard is a name ending with `.ume.html` though, to avoid usage outside of umejs.

```html
<!-- template/layout.ume.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\{title}</title>
</head>
<body>
    \{_BODY}
</body>
</html>
```

You may have noticed `\{title}` and `\{_BODY}`. These are variables. `\{_BODY}` is one created by umejs (you will get an error if you try and define it) and `\{title}` is the custom variable we defined in the `hello.md` file. This is all that's needed for creating an ume server though!

## Step 5: starting the server

To recap, we have a file structure that looks like this:
```
.
├── blog
│   └── hello.md
├── index.js
├── package-lock.json
├── package.json
└── template
    └── layout.ume.html
```

We can now try starting up the server:

```
node index.js
```

You should now be able to check out the created file at `http://localhost:3000/blog/hello`!
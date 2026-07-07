---
title: "{_SLUG}"
edited: 2026-07-1
---

The template path is the file where you'll create the template of your website. 

As your template is an HTML file that can be fully parsed with umejs, you *should* make the file extension `.ume.html`, to make clear that is can only be properly rendered using umejs. It's not an enforced requirement though, you can name it however you please. 

Here's an example definition for your configuration:

```js
const ume = require("@dantenl/umejs")
const path = require('path');
ume({
    templatePath: path.join(__dirname, 'layout.ume.html'),
    // ! you'll also need to define contentDir if you want a valid umejs config!
})
```

Inside this file, you will also need the actual template. This is basically the wrapper for your Markdown (once converted to HTML) and is placed inside it. Here's an incredibly simple example of a template file:

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

umejs will automagically replace `\{_BODY}` with the generated HTML page.

Inside the layout file, you're free to use all variables. For example, you could define a `\{title}` variable in your Markdown document and you could then reference said title as the `<title>` element. Here's what that would look like:

```md
---
title: My Article
---

# Hello world!
```

In the `layout.ume.html` file, you'd simply replace `\{_SLUG}` with `\{title}`.
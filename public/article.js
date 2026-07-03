function updateHeaderHeight() {
    console.log("trest")
    const header = document.querySelector('header');
    if (!header) return;

    // get full occupied height: border + padding + content
    const height = header.offsetHeight;

    // get margin-bottom
    const style = getComputedStyle(header);
    const marginBottom = parseFloat(style.marginBottom) || 0;

    // total vertical space from top of header to bottom of its margin
    const totalHeight = height + marginBottom;

    document.documentElement.style.setProperty('--header-total-height', totalHeight + 'px');
}

function updateMainHeight() {
    const main = document.querySelector("main")
    const [sidebar] = document.getElementsByClassName("sidebar")

    if(sidebar) {
        const sidebarHeight = sidebar.offsetHeight
        main.style.minHeight = sidebarHeight + 30 + "px"
    }
}

function updateStyles() {
    updateHeaderHeight()
    updateMainHeight()
}

// run on load and whenever the header might resize
window.addEventListener('load', updateStyles);
window.addEventListener('resize', updateStyles);

// --- highlight.js setup ---
document.querySelectorAll('code').forEach((block) => {
    // check if the block has a language class (e.g., 'language-js')
    const hasLanguageClass = Array.from(block.classList).some(cls => cls.startsWith('language-'));


    if (hasLanguageClass) {
        // explicitly highlight using the class, which disables auto-detection for this block
        hljs.highlightElement(block);
        addCopyButton(block)
    } else {
        block.classList.add('plaintext');
        block.classList.add('hljs');
        addCopyButton(block)
        // for future compatibility
    }
});

function addCopyButton(codeElement) {
    // select all <pre><code> blocks

    // get the parent <pre>
    const pre = codeElement.closest('pre');
    if (!pre) return;

    // avoid duplicate buttons
    if (pre.querySelector('.copy-btn')) return;

    // create the button
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';

    // copy action
    btn.addEventListener('click', async () => {
        // Get the text content of the code block
        const codeText = codeElement.textContent;

        try {
            await navigator.clipboard.writeText(codeText);
            btn.textContent = 'Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = 'Copy';
                btn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            // fallback for older browsers or non‑HTTPS contexts
            console.error('Failed to copy:', err);
            fallbackCopy(codeText, btn);
        }
    });

    // insert the button inside the <pre>
    pre.appendChild(btn);
}

// fallback for older browsers
function fallbackCopy(text, btn) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
        }, 2000);
    } catch (err) {
        alert('Unable to copy. Please copy manually.');
    }
    document.body.removeChild(textarea);
}

// --- toggle dark mode ---

const darkModeMql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
const light = document.getElementById('hljs-light');
const dark = document.getElementById('hljs-dark');
const darkModeButton = document.getElementById("dark-mode-toggle")

if(!localStorage.getItem("mode")) {
    // user hasn't made a choice between light or dark mode yet
    localStorage.setItem("mode", darkModeMql && darkModeMql.matches ? "dark" : "light")
}

initDarkMode()


window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    localStorage.setItem("mode", darkModeMql && darkModeMql.matches ? "dark" : "light")
    initDarkMode()
})

function enableDarkMode() {
    document.body.classList.add("dark")
    light.disabled = true
    dark.disabled = false
    darkModeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`
    localStorage.setItem("mode", "dark")
}

function disableDarkMode() {
    document.body.classList.remove("dark")
    light.disabled = false
    dark.disabled = true
    darkModeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`
    localStorage.setItem("mode", "light")
}

function toggleDarkMode() {
    if(localStorage.getItem("mode") === "dark") {
        disableDarkMode()
    } else {
        enableDarkMode()
    }
}

function initDarkMode() {
    if (localStorage.getItem("mode") === "dark") {
        enableDarkMode()
    } else {
        disableDarkMode()
    }
}

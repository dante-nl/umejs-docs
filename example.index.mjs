import { default as ume } from "@dantenl/umejs"
import { fileURLToPath } from 'url';
import express from 'express';
import path from 'path';

const app = express();
const PORT = 9418

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const umeConfig = ume({
    contentDir: path.join(__dirname, 'v1'),
    templatePath: path.join(__dirname, 'v1', 'layout-v1.ume.html'),
    partialsDir: path.join(__dirname, 'v1', 'partials'),
})

// init docs with umejs
app.use('/v1/{*slug}', umeConfig);

// make everything from /public accessible
app.use(express.static(__dirname + '/public', { extensions: ['html'] }));

app.get('/', (req, res) => {
    res.redirect(301, "/v1/")
});

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/public/404.html")
});

// ----- Start the server -----
console.log()
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
import express from 'express';
import showdown from 'showdown'
import showdownHighlight from 'showdown-highlight'
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
    const username = 'GekkeBoyJeff';
    // fetch all repos from github
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
        },
    });
    const data = await response.json();

    res.render('projects', { data });
});

router.get('/:name', async (req, res) => {
    const username = 'GekkeBoyJeff';
    const name = req.params.name;
    console.log(name)

    const response = await fetch(`https://raw.githubusercontent.com/${username}/${name}/main/README.md`);
    const data = await response.text();
    let converter = new showdown.Converter({
        // That's it
        extensions: [showdownHighlight({
            // Whether to add the classes to the <pre> tag, default is false
            pre: true
            // Whether to use hljs' auto language detection, default is true
        ,   auto_detection: true
        })]
    });
    let html = converter.makeHtml(data);
    // replaceall
    html = html.replaceAll('\t', '  ');
    console.log(html)

    res.render(`detail` ,{name, html});
});

export default router;
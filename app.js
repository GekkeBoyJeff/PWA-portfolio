import express from 'express';
import fetch from 'node-fetch';

import projectsRouter from './routes/projects.js';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const username = "GekkeBoyJeff";
    try {
        const response = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${username}`);
        const repos = await response.json();
        console.log(repos);

        repos.forEach(async repo => {
            const repoDataResponse = await fetch(`https://raw.githubusercontent.com/${username}/${repo.repo}/main/assets/mockup.webp`);
            const repoData = await repoDataResponse;
            console.log(repoData);
        });

        res.render('index', { repos });
    } catch (error) {
        console.error(error.message);
        res.status(500).end();
    }
});

app.use('/projects', projectsRouter);
app.use(express.static('public')); // Static files (css, js, images)

app.listen(port, () =>{
    console.log(`Server is running on port http://127.0.0.1:${port}`)
})

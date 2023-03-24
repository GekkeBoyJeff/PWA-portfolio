import express from 'express';
import { Remarkable } from 'remarkable';

const router = express.Router();

router.get('/', async (req, res) => {
    const username = 'GekkeBoyJeff';
    // fetch all repos from github
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();
    // for (let i = 0; i < data.length; i++) {
    //     console.log(data[i].name)
    // }

    res.render('projects', { data });
});

router.get('/:name', async (req, res) => {
    const username = 'GekkeBoyJeff';
    const name = req.params.name;
    console.log(name)

    const response = await fetch(`https://raw.githubusercontent.com/${username}/${name}/main/README.md`);
    const data = await response.text();
    var md = new Remarkable();

    var html = md.render(data);
    console.log(html)

    res.render(`detail` ,{name, html});
});

export default router;
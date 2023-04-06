import compression from 'compression';
// import fs from "fs";
// import https from "https";

// const key = fs.readFileSync("localhost-key.pem", "utf-8");
// const cert = fs.readFileSync("localhost.pem", "utf-8");

import express from 'express'
import projectsRouter from './routes/projects.js';
import { fetchRepos, mapRepoImages, fetchQuote } from './fetch.js';

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(compression()); // Add gzip compression middleware
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const username = 'GekkeBoyJeff'

  try {
    const repos = await fetchRepos(username)
    const repoImages = mapRepoImages(username, repos)

    const quote = await fetchQuote();
    res.render('build/index', { repos, repoImages, quote })
  } catch (error) {
    console.error(error.message)
    res.status(500).end()
  }
})

app.get('/offline', async (req, res) => {
  res.render('offline');
})

app.use('/projects', projectsRouter);

// https.createServer({ key, cert }, app).listen(port, () => {
//   console.log(`Server is running on port https://localhost:${port}`)
// });

app.listen(port, () => {
  console.log(`Server is running on port http://127.0.0.1:${port}`)
})
// Import needed modules
import express from 'express'
import fetch from 'node-fetch'

import projectsRouter from './routes/projects.js';

// Initialize Express app and set up port
const app = express()
const port = 3000

app.use('/projects', projectsRouter);
app.use(express.static('public')); // Static files (css, js, images)

// Set view engine to ejs
app.set('view engine', 'ejs')

// Define route handling for home page
app.get('/', async (req, res) => {
  const username = 'GekkeBoyJeff'

  try {
    // Fetch data from external API
    const repos = await fetchRepos(username)
    // Map image URLs for each project
    const repoImages = mapRepoImages(username, repos)

    const quote = await fetchQuote(quotes);
    // Render EJS template, passing in data as variables
    res.render('index', { repos, repoImages, quote })
  } catch (error) {
    console.error(error.message)
    res.status(500).end()
  }
})

// Start server listening on defined port
app.listen(port, () => {
  console.log(`Server is running on port http://127.0.0.1:${port}`)
})

// Function to fetch repositories from external API
async function fetchRepos(username) {
  const response = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${username}`)
  return response.json()
}

// Function to map image URLs for each repository
function mapRepoImages(username, repos) {
  return repos.map((repo) => {
    return `https://raw.githubusercontent.com/${username}/${repo.repo}/main/assets/mockup.webp`
  })
}

// Define quotes to be displayed on home page
const quotes = [
    `Omdat mijn code niet alleen werkt, maar ook van je houdt. ❤️`,
    `Ik breng de term "user-friendly" naar een heel nieuw niveau. 🙌`,
    `Ik ben de persoon die je zoekt als je graag pixel-perfect werk aflevert. 👌`,
    `Waarom een gewone web developer inhuren als je er een kunt hebben die ook nog eens heel grappig is? 😂`,
    `Ik ben als een alchemist van code; ik kan van jouw ideeën goud maken. 🌟`,
    `Ik ben als een spin in het web van jouw project; ik houd alles bij elkaar en maak het mooi. 🕸️`,
    `Ik ben net als een superheld, maar in plaats van een cape heb ik mijn toetsenbord en mijn code-krachten. 💻`,
    `Mijn code is als een bloem die bloeit; het is mooi, functioneel en het laat je glimlachen. 🌷`,
    `Als jij de regisseur bent, dan ben ik de cameraman die je laat zien hoe je project tot leven kan komen. 🎬`,
    `Waarom je mij moet inhuren? Omdat ik niet alleen weet wat ik doe, maar ook dol ben op wat ik doe. En dat merk je aan mijn werk. 😎`,
    `Ik maak je website beter dan die van je concurrentie! 💻🚀`,
    `Als web developer ben ik geboren om code te schrijven! 💻👶`,
    `Ik zet mijn tanden in elk project als een web developer met honger! 🍴💻`,
    `Ik bouw niet alleen websites, ik bouw dromen! 💭💻`,
    `Met mij als web developer, krijg je een website die er geweldig uitziet en werkt! 😎💻`,
    `Ik ben net als de perfecte CSS - onmisbaar! 💁‍♀️💻`,
    `Als je mijn code ziet, weet je dat het goed zit! 👨‍💻💯`,
    `Ik ben een web developer die van een uitdaging houdt - niets is te moeilijk! 💪💻`,
    `Met mij aan boord als web developer, ben je klaar om de wereld te veroveren! 🌎💻`,
    `Ik ben de web developer die je nodig hebt voor je volgende project! 🙌💻`,
    `Ik bouw niet alleen websites, ik bouw merken! 💻🏢`,
    `Ik ben de web developer die je website nodig heeft! 🦸‍♂️💻`,
    `Ik bouw websites die zo soepel lopen als boter op een warme pannenkoek! 🥞💻`,
    `Als web developer ben ik altijd up-to-date met de nieuwste technologieën! 👨‍💻📱`,
    `Ik ben een web developer die de bal aan het rollen brengt! ⚽️💻`,
    `Je kunt op mij rekenen om een website te bouwen die opvalt in de menigte! 👀💻`,
    `Ik maak je website zo aantrekkelijk dat mensen hem willen knuffelen! 🤗💻`,
    `Als web developer breng ik je website tot leven! 🌟💻`,
    `Met mij als web developer, kun je achterover leunen en ontspannen - ik zorg voor alles! 😌💻`,
    `Ik ben de web developer die je website verdient! 🎖️💻`
];

// Function to fetch a random quote from external API
async function fetchQuote(quotes) {
    // Randomly select a quote from the array
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(quote)
    return quote;
}

// https://github.com/lovell/sharp
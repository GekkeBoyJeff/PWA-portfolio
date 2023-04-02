# Progressive Web Apps Course - Portfolio Project

This project is part of the Progressive Web Apps course at Amsterdam University of Applied Sciences. The goal is to build a server-side rendered application using Node.js, TypeScript, and Express, and then gradually enhance it to become a Progressive Web App (PWA).

## Table of Contents

- [Week 1](#week-1)
- [Week 2](#week-2)
- [Week 3](#week-3)
- [Getting Started](#getting-started)



## Week 1

### Exercise 1: Refactor the WAFS App to a server side version with Node.js & Express

- [x] Forked the repo: [Progressive Web Apps 2022](https://github.com/your-username/progressive-web-apps-2022)
- [x] Refactored the app
- [x] Updated CSS
- [x] Improved app with client-side JavaScript

#### Progress Update

Ik begon met het forken van de repo. Daarna heb ik mijn oude portfolio project toegevoegd en begon ik deze om te bouwen naar pwa (met behulp van de opdrachten deze week.).

Het begin was vrij lastig. Ik wou gebruik maken van vite en typescript maar snapte na een tijd strugglen de logica er niet achter. Op advies van Declan heb ik het zonder vite en typescript gedaan zodat ik meer tijd had voor de opdracht zelf.

Het begin daarvan was wel vrij simpel. Een nodeJS applicatie opzetten was zo gedaan, echter moest ik wel nog wat onderzoek doen naar requests, responses en routing.

Omdat mijn oude code nog gebruik maakte van hash routing moest ik dit ombouwen naar nodeJS routing. het mocht namelijk ook geen single page applicatie meer zijn. 

Hiervoor moest ik dus gebruik maken van express om een server op te zetten en ejs als templating engine. Het koppelen van de data aan de back-end aan ejs was nieuw voor mij en het duurde even voordat ik door had hoe je dit nou precies deed. 

#### Challenges and Learnings

Het ombouwen van mijn gehele CSS was nogal een behoorlijke taak. Ik had geen gebruik gemaakt van classes in mijn vorige project. dus veranderde mijn code van het één naar het ander. 
Hieronder een klein deel van de verandering:

before:
```HTML
<section>
	<div class="background">
	  <h2>Ervaring in een oogopslag</h2> 
	  <blockquote cite="#">
		<p></p>
	  </blockquote>
	</div>
	<ul>
	  <li><h3>2+ jaar erva  ring</h3></li>
	  <li><h3>2 projecten afgerond</h3></li>
	  <li><h3>1 client</h3></li>
	</ul>
</section>
```

```CSS
main>section:first-of-type>ul li h3::after,
main>section:first-of-type>ul li h3::before {
  content: '';
  display: flex;
  height: 0.3em;
  width: 100%;
  background: rgb(255 255 255 / .6);
  position: relative;
  border-radius: 2em;
  transition: .5s;
}

h3 {
  position: relative;
  width: 100%;
}

main>section:first-of-type>ul li:hover h3::after {
  transform: translateX(-18em);
}

main>section:first-of-type>ul li:hover h3::before {
  transform: translateX(18em);
}

main>section:first-of-type>ul li h3::after {
  right: -12em;
  top: .5em;
}

main>section:first-of-type>ul li h3::before {
  left: -12em;
  bottom: .5em;
}
```
After
```HTML
<section class="column flex50">
  <div class="background">
	<h2 class="hidden">Ervaring in een oogopslag</h2> 
	<blockquote cite="#">
	  <p>
		<%- quote %>
	  </p>
	</blockquote>
  </div>
  <ul class="height50">
	<li><h3>2+ jaar ervaring</h3></li>
	<li><h3>2 projecten afgerond</h3></li>
	<li><h3>1 client</h3></li>
  </ul>
</section>
```

```CSS
.height50 li h3::after,
.height50 li h3::before {
    content: '';
    display: flex;
    height: 0.3em;
    width: 100%;
    background: rgb(255 255 255 / .6);
    position: relative;
    border-radius: 2em;
    transition: .5s;
}

h3 {
    position: relative;
    width: 100%;
}

.height50 li:hover h3::after {
    transform: translateX(-18em);
}

.height50 li:hover h3::before {
    transform: translateX(18em);
}

.height50 li h3::after {
    right: -12em;
    top: .5em;
}

.height50 li h3::before {
    left: -12em;
    bottom: .5em;
}
```
---

De hash routing moest ook weg omdat dus gebruik ging maken van meerdere pagina's. Omdat ik met nodeJS en ejs ging werken gingen werkte mijn routes met behulp van express en ejs.

Before:
```JS
export async function router() {
    const hash: string = window.location.hash; // Get the hash from the URL
    const parts: string[] = hash.split('/'); // Split the hash into an array of parts
    
    if (hash === '') {
        window.location.hash = '#home';
    }

    const section6 = document.querySelector('section:nth-of-type(6)')!;

    switch (parts[0]) {
        case '#home':
            console.log('home');
            fetchPinnedRepositories('GekkeBoyJeff');
            checkForItems();
            section6.innerHTML = '<div></div>';
            break;
        case '#projects':
            fetchAllRepositories('GekkeBoyJeff');
            checkForItems();
            if (parts.length > 1) {
                const page: string = parts[1];
                console.log(`project/${page}`);
                fetchCurrentRepository('GekkeBoyJeff', page);
            } else {
                console.log('projects');
                section6.innerHTML = '<div></div>';
            }
            break;
        default:
            console.log("can't find hash \nredirecting to home");
            window.location.hash = '#home';
            break;
    }
}
```

After:
```JS
app.get('/', async (req, res) => {
  const username = 'GekkeBoyJeff'

  try {
    const repos = await fetchRepos(username)
    const repoImages = mapRepoImages(username, repos)

    const quote = await fetchQuote();
    res.render('index', { repos, repoImages, quote })
  } catch (error) {
    console.error(error.message)
    res.status(500).end()
  }
})

app.use('/projects', projectsRouter);
```

---

## Week 2

### Exercise 1: Convert your app into a Progressive Web App

WPA => Https - service workers and manifest

voordelen:
1. offline support
2. service workers
	1. Javascript
	2. web worker
	3. Draait in het achtergrond
	4. aparte thread(achtergrond)
	5. event based (idle en luisterd alleen naar events)
	6. geen toegang tot de DOM
	7. geen Global state
3. push notifications
4. Native sharing
5. Desktop apps

Registreer service worker:
```JS
if ('serviceWorker' in navigator) {
	 window.addEventListener(‘load’, function() {
		 navigator.serviceWorker.register('/service-worker.js')
		 .then(function(registration) {
		 return registration.update();
	 })
 });
}
```

SERVICE WORKER LIFECYCLE
```JS
self.addEventListener(‘install’, event => { /* do I even exist? */ }); self.addEventListener(‘activate’, event => { /* am I even active? */ }); self.addEventListener(‘fetch’, event => { /* can I even do cool stuff? /* })
```

Cache on install (cache storage (local storage voor requests en responses))
cache on fetch

serve page from cache

precaching is essentieel om je website snel te laten werken (offline fallback pagina, css pagina, en misschien een javascript)
pre-caching doe je in het install event
```JS
const CORE_CACHE_NAME = 'core-cache';
const CORE_ASSETS = [/* css, bundle.js offline page */]

self.addEventListener('install', event =>{
	event.waitUntill(
	caches.open(CORE_CACHE_NAME)
	.then(cache => cache.addAll(CORE_ASSETS))
	.then(() => self.skipWaiting())
	)
});
```

Serve from cache
```JS
	self.addEventListener('fetch', event =>{
		const request = event.request;
			if(isInCoreCache(request)){
			event.respondWith(
				caches.open(CORE_CACHE_NAME)
					.then(cache => cache.match(request.url))
			)
		}
	})
```

Runtime caching
```JS
self.addEventListener('fetch', event =>{
	const request = event.request;
	if(isSomethingParticular(request) && isNotCached(request)){
	event.respondWith(
	return fetch(request).then(response =>{
	return caches.open('mycache')
	.then(cache =>{
	cache.put(request, response.clone())
	})
	.then(() => response )}))}
})
```

Hijack fetch 
```JS
self.addEventListener('fetch', event =>{
	const request = event.request;
	event.respondWith(
		console.log('doe hier je dingen')
	);
});
```

```JS
self.addEventListener(‘install’, event => {
 // on installation
});
self.addEventListener(‘activate’, event => {
 // on activation
});
self.addEventListener(‘fetch’, event => {
 // on outgoing request
});
self.addEventListener(‘push’, event => {
 // on push message received
});
self.addEventListener(‘message’, event => {
 // on message from app
});
self.addEventListener(‘sync’, event => {
 // 
})
```

**Caching strategies**

Er zijn een aantal caching strategieen die je kan toepassen. namelijk:
1. Cache only
2. Network only
3. Cache first
4. Network first
5. Stale while validate
6. Stale while revalidate
7. Generic fallback

- [ ] Make an installable version of the app

### Exercise 2: Implement a Service Worker

- [ ] Implement a Service Worker
- [ ] Create a job story
- [ ] Cache and serve static assets
- [ ] Provide online/offline

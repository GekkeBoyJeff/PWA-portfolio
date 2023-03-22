```js



```

get form voegt data toe aan url
form method="get" action="/search"
input name = query

build script voor het minifyen van css: 
"prebuild ": "rimraf ./static" // delets old files

npm-run-all build:* // build alles wat de query matcht
build:css: "node scripts/build-css"

```JS
const gulp = require('gulp')
const concat = require*'guld-concat'
const autoPrefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')

/* Je kan gulp gebruiken om je js/css te minifyen */

return gulp.src([
'./src/css/style.css'
])

pipe(concat(style.css))
pipe(gulp.dest())


```

```HTML
	<form data-search-form>
```

```JS
function(){
	const searchForm = document.querySelector('[data-search-form]')
	if(!searchForm){
		return;
	}
	
	searchForm.addEventListener('submit', (event) =>{
		event.prefentDefault();
		const formData = new FormData(event.target)
		console.log(formData.get('query'))
	})
}


```

```JS
fetch(event.target.action + `?query=${formData.get('query')}&async=true`)
```

```JS
if(req.query.async){
res.render('partials/result-list' )
}else{
	
}
```


Staat in de examples folder

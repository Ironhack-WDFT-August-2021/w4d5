// set up express
const express = require('express');
const app = express();


// this we need to set if we use hbs
app.set('view engine', 'hbs');

// this is needed to be able to use hbs partials
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');


// this registers the public folder it can be accessed in the browser
app.use(express.static(__dirname + '/public'));

const port = 5000;

const movies = require('./movies.json');

app.get('/', (req, res) => {
	console.log(movies);
	res.render('movies', { moviesList: movies, doctitle: 'All the Movies' });
})


// using a query string
// app.get('/someroute', (req, res) => {
// 	// accessing the query string
// 	res.send(req.query.q);
// })

app.get('/about', (req, res) => {
	// use :  layout: false to skip the base layout for a specific route
	res.render('about', { doctitle: 'About Page', })
})


app.get('/search', (req, res) => {
	console.log(req.query.q);
	const searchPhrase = req.query.q;
	const filteredMovies = movies.filter(movie =>
		movie.title.toLowerCase().includes(searchPhrase.toLowerCase())
	)
	console.log(filteredMovies);
	res.render('movies', { moviesList: filteredMovies, doctitle: 'Filtered Movies' });
})

app.get('/:title', (req, res) => {
	res.send(req.params);
})


app.get('/movies/:title', (req, res) => {
	const clickedTitle = req.params.title;
	const clickedMovie = movies.find(movie => movie.title === clickedTitle)
	res.render('movieDetails', { clickedMovie: clickedMovie });
})


// route parameter -> : indicates the variable
// req.params looks like -> {title: 'value from the url}

// start the server
app.listen(port, function () {
	console.log(`Server listening on port ${port}`)
});
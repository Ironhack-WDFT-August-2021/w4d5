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

app.get('/godfather', (req, res) => {
	// find the movie
	// const godfather = movies.find(function (movie) {
	// 	return movie.title === 'The Godfather'
	// })

	const godfather = movies.find(movie => movie.title === 'The Godfather')
	console.log(godfather);
	// render a detail view for the movie
	res.render('movieDetails', { clickedMovie: godfather });
})

app.get('/about', (req, res) => {
	// use :  layout: false to skip the base layout for a specific route
	res.render('about', { doctitle: 'About Page', })
})

// start the server
app.listen(port, function () {
	console.log(`Server listening on port ${port}`)
});
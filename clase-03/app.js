const express = require('express')
const moviesJSON = require('./movies.json')

const app = express()
app.disable('x-powered-by')

// URL base -------------
app.get('/', (req, res) => {
  res.json({message:"Inicio"})
})

// Obtener todas las peliculas -----------
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = moviesJSON.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    return res.json(filteredMovies)
  }
  res.json(moviesJSON)
})

// OBtener pelicula por ID -----------
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = moviesJSON.find(movie => movie.id === id)
  if(movie) return res.json(movie)
  res.status(404).json({message: "Movie id not found"})
})

// ------------------------------------INICIO DE API ---------------------------------------------
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
})

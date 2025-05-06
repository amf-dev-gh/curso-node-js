const express = require('express')
const crypto = require('node:crypto')
const moviesJSON = require('./movies.json')
const { validateMovie, validateParcialMovie } = require('./schemas/movies')

const app = express()
app.use(express.json())
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

// Crear una pelicula -----------
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  // Esto no es REST porque guarda el estado en memoria !!! <---
  moviesJSON.push(newMovie)
  res.status(201).json(newMovie)
})

// Actualizar una pelicula -----------
app.patch('/movies/:id', (req, res) => {
  const result = validateParcialMovie(req.body)
  if (!result.success) return res.status(422).json({ error: JSON.parse(result.error.message) })
    
  const { id } = req.params
  const movieIndex = moviesJSON.findIndex(movie => movie.id === id)
  if (movieIndex < 0) return res.status(404).json({message: "Movie id not found"})

  const updateMovie = {
    ... moviesJSON[movieIndex],
    ... result.data
  }

  moviesJSON[movieIndex] = updateMovie
  return res.json(updateMovie)
})

// ------------------------------------INICIO DE API ---------------------------------------------
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
})

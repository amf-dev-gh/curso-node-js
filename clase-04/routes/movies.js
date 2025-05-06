import { Router } from 'express'
import { validateMovie, validateParcialMovie } from '../schemas/movies.js'
import { MovieModel } from '../models/movie.js'

export const moviesRouter = Router()

// Obtener todas las peliculas
moviesRouter.get('/', async (req, res) => {
  const { genre } = req.query
  const movies = await MovieModel.getAll({ genre })
  res.json(movies)
})

// OBtener pelicula por ID
moviesRouter.get('/id', async (req, res) => {
  const { id } = req.params
  const movie = await MovieModel.getById(id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie id not found' })
})

// Crear una pelicula
moviesRouter.post('/', async (req, res) => {
  const result = validateMovie(req.body)
  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }
  const movie = await MovieModel.create({ input: result.data })
  res.status(201).json(movie)
})

// Actualizar una pelicula
moviesRouter.patch('/:id', async (req, res) => {
  const result = validateParcialMovie(req.body)
  if (!result.success) return res.status(422).json({ error: JSON.parse(result.error.message) })
  const { id } = req.params
  const updatedMovie = await MovieModel.update({ id, input: result.data })
  if (updatedMovie === false) return res.status(404).json({ message: 'Movie id not found' })
  return res.json(updatedMovie)
})

// Eliminar una pelicula
moviesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const result = await MovieModel.deleteById(id)
  if (result === false) return res.status(404).json({ message: 'Movie id not found' })
  res.json({ message: 'Movie deleted' })
})

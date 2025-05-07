// import { MovieModel } from '../models/local-file-system/movie.js' // --> Esto se utilizaba para obtener la info de JSON
import { MovieModel } from '../models/mysql/movie.js'
import { validateMovie, validateParcialMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie id not found' })
  }

  static async create (req, res) {
    const result = validateMovie(req.body)
    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }
    const movie = await MovieModel.create({ input: result.data })
    res.status(201).json(movie)
  }

  static async update (req, res) {
    const result = validateParcialMovie(req.body)
    if (!result.success) return res.status(422).json({ error: JSON.parse(result.error.message) })
    const { id } = req.params
    const updatedMovie = await MovieModel.update({ id, input: result.data })
    if (updatedMovie === false) return res.status(404).json({ message: 'Movie id not found' })
    return res.json(updatedMovie)
  }

  static async deleteById (req, res) {
    const { id } = req.params
    const result = await MovieModel.deleteById({ id })
    if (result === false) return res.status(404).json({ message: 'Movie id not found' })
    res.json({ message: 'Movie deleted' })
  }
}

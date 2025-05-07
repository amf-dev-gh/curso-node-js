import { validateMovie, validateParcialMovie } from '../schemas/movies.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })
    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie id not found' })
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)
    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }
    const movie = await this.movieModel.create({ input: result.data })
    res.status(201).json(movie)
  }

  update = async (req, res) => {
    const result = validateParcialMovie(req.body)
    if (!result.success) return res.status(422).json({ error: JSON.parse(result.error.message) })
    const { id } = req.params
    const updatedMovie = await this.movieModel.update({ id, input: result.data })
    if (updatedMovie === false) return res.status(404).json({ message: 'Movie id not found' })
    return res.json(updatedMovie)
  }

  deleteById = async (req, res) => {
    const { id } = req.params
    const result = await this.movieModel.deleteById({ id })
    if (result === false) return res.status(404).json({ message: 'Movie id not found' })
    res.json({ message: 'Movie deleted' })
  }
}

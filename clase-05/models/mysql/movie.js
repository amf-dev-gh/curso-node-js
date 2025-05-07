import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root1234',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      const [genres] = await connection.query(
        'SELECT id, name FROM genres WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )

      if (genres.length === 0) return []

      const [{ id }] = genres

      const [moviesId] = await connection.query('SELECT BIN_TO_UUID(movie_id) id FROM movie_genres WHERE genre_id = ?;', [id])

      const moviePromises = moviesId.map(({ id }) =>
        connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movies WHERE id = UUID_TO_BIN(?);', [id])
          .then(([movie]) => movie[0])
      )

      const movies = await Promise.all(moviePromises)
      return movies
    }

    const [movies] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movies;')
    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movies WHERE id = UUID_TO_BIN(?);', [id]
    )
    if (movies.length === 0) return null
    return movies[0]
  }

  static async create ({ input }) {}

  static async deleteById ({ id }) {}

  static async update ({ id, input }) {}
}

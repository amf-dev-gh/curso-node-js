import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root1234',
  database: 'moviesdb'
}

const connectionStringConfig = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionStringConfig)

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

  static async create ({ input }) {
    const {
      // genre: genreInput,
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid')
    const [{ uuid }] = uuidResult

    try {
      await connection.query('INSERT INTO movies (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)', [uuid, title, year, director, duration, poster, rate])
    } catch (err) {
      // Puede enviar informacion sensible
      throw new Error('Error creating movie')
    }

    // TODO agregar genero a la pelicula creada...

    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movies WHERE id = UUID_TO_BIN(?);', [uuid])

    return movies[0]
  }

  static async deleteById ({ id }) {
    const [movies] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movies WHERE id = UUID_TO_BIN(?);', [id])
    const movie = movies[0]
    if (!movie) return false

    const [result] = await connection.query('DELETE FROM movies WHERE id = UUID_TO_BIN(?);', [movie.id])
    return result.affectedRows > 0
  }

  static async update ({ id, input }) {
    const [movies] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movies WHERE id = UUID_TO_BIN(?);', [id])
    const movie = movies[0]
    if (!movie) return false

    const allowedFields = ['title', 'year', 'director', 'duration', 'poster', 'rate']
    const fieldsToUpdate = []
    const values = []

    for (const field of allowedFields) {
      if (input[field] !== undefined) {
        fieldsToUpdate.push(`${field} = ?`)
        values.push(input[field])
      }
    }

    if (fieldsToUpdate.length === 0) return false

    const sqlQuery = `UPDATE movies SET ${fieldsToUpdate.join(', ')} WHERE id = UUID_TO_BIN(?);`
    values.push(id)

    const [result] = await connection.query(sqlQuery, values)

    if (result.affectedRows > 0) {
      const [movies] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movies WHERE id = UUID_TO_BIN(?);', [id])
      const movie = movies[0]
      return movie
    }

    return false
  }
}

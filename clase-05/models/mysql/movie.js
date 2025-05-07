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
    const [movies] = await connection.query('select title, year, director, duration, poster, rate, bin_to_uuid(id) id from movies;')
    console.log(movies)
  }

  static async getById ({ id }) {}

  static async create ({ input }) {}

  static async deleteById ({ id }) {}

  static async update ({ id, input }) {}
}

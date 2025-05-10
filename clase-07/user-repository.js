import crypto from 'node:crypto'

import bcrypt from 'bcrypt'
import DBLocal from 'db-local'
import { SALT_ROUNDS } from './config.js'
const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static async create ({ username, password }) {
    // Validar que el username no exista
    const user = User.findOne({ username })
    if (user) throw new Error('El nombre de usuario ya existe en la base de datos')

    // Crear el id y encriptar contraseña
    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    User.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()

    return id
  }

  static async login ({ username, password }) {
    const user = User.findOne({ username })
    if (!user) throw new Error('El nombre de usuario no existe')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('Contraseña inválida')

    const { password: _, ...publicUser } = user
    return publicUser
  }
}

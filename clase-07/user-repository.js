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
    // Validar los inputs. (Puede ser con zod)
    if (typeof username !== 'string') throw new Error('El nombre de usuariuo debe ser un string')
    if (username.length < 3) throw new Error('El nombre de usuario debe tener mas de 3 caracteres')

    if (typeof password !== 'string') throw new Error('La contraseña debe ser un string')
    if (password.length < 5) throw new Error('La contraseña debe tener mas de 5 caracteres')

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

  static async login ({ username, password }) {}
}

// function validate(input) {}

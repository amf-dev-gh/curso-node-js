import z from 'zod'

const userEntity = z.object({
  username: z.string({
    invalid_type_error: 'El nombre de usuario debe ser un string',
    required_error: 'El nombre de usuario es requerido'
  }).min(3, {
    message: 'El nombre de usuario debe tener mas de 3 caracteres'
  }),
  password: z.string({
    invalid_type_error: 'La constraseña debe ser un string',
    required_error: 'La constraseña es requerida'
  }).min(5, {
    message: 'La contraseña debe tener mas de 5 caracteres'
  })
})

export function validateUser (object) {
  return userEntity.partial().safeParse(object)
}

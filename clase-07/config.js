export const {
  PORT = 4321,
  SALT_ROUNDS = 10,
  JWT_SECRET_KEY = 'aqui-la-clave-srcreta_para_firmar?el?JTW-segura?=)',
  JWT_EXPIRATION_TIME = '1h'
} = process.env

import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { JWT_EXPIRATION_TIME, JWT_SECRET_KEY, PORT } from './config.js'
import { UserRepository } from './user-repository.js'
import { validateUser } from './validations.js'

const app = express()
app.use(express.json())
app.set('view engine', 'ejs')
app.use(cookieParser())
// El siguiente midelware agrega la información a la request y continua con las rutas.
app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }
  try {
    const data = jwt.verify(token, JWT_SECRET_KEY)
    req.session.user = data
  } catch {}
  next()
})

app.get('/', (req, res) => {
  const { user } = req.session
  res.render('index', user)
})

app.post('/login', async (req, res) => {
  const result = validateUser(req.body)
  if (result.error) return res.status(400).send({ error: JSON.parse(result.error.message) })
  try {
    const { username, password } = req.body
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION_TIME })
    res
      .cookie(
        'access_token',
        token,
        {
          httpOnly: true, // Solo se puede acceder a la cookie desde el servidor, no desde el cliente(js, navegador)
          secure: process.env.NODE_ENV === 'production', // Solo se pùede acceder a la cookie en https
          sameSite: 'strict', // Solo se pùede acceder a la cookie desde el mismo dominio
          maxAge: 1000 * 60 * 60 // Tiempo de expiración de la cookie
        })
      .send({ user })
  } catch (error) {
    res.status(401).send(error.message)
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('access_token').json({ message: 'Sesión cerrada correctamente' })
})

app.post('/register', async (req, res) => {
  const result = validateUser(req.body)
  if (result.error) return res.status(400).send({ error: JSON.parse(result.error.message) })

  try {
    const { username, password } = req.body
    const id = await UserRepository.create({ username, password })
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign({ id, username }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION_TIME })
    res.cookie('access_token', token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      }).send({ user })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.get('/protected', (req, res) => {
  const { user } = req.session
  if (!user) return res.status(403).send('Acceso no autorizado')
  res.render('protected', user)
})

app.listen(PORT, () => {
  console.log(`Server corriendo en -> http://localhost:${PORT}`)
})

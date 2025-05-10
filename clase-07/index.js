import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'
import { validateUser } from './validations.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Inicio de app para autenticar!</h1>')
})

app.post('/login', (req, res) => {
  res.json({ user: 'amf-dev' })
})

app.post('/logout', (req, res) => {})

app.post('/register', async (req, res) => {
  const result = validateUser(req.body)
  if (result.error) return res.status(400).send({ error: JSON.parse(result.error.message) })

  try {
    const { username, password } = req.body
    const id = await UserRepository.create({ username, password })
    res.send({ id })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.get('/protected', (req, res) => {
  // res.send('<h1>Ruta protegida</h1>')
})

app.listen(PORT, () => {
  console.log(`Server corriendo en -> http://localhost:${PORT}`)
})

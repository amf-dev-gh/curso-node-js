import express from 'express'
import { PORT } from './config.js'

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Inicio de app para autenticar!</h1>')
})

app.post('/login', (req, res) => {
  res.json({ user: 'amf-dev' })
})

app.post('/logout', (req, res) => {})

app.post('/register', (req, res) => {})

app.get('/protected', (req, res) => {
  // res.send('<h1>Ruta protegida</h1>')
})

app.listen(PORT, () => {
  console.log(`Server corriendo en -> http://localhost:${PORT}`)
})

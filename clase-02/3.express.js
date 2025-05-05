const express = require('express')
const dataJson = require('./pokemon/ditto.json')
const PORT = process.env.PORT ?? 3000

const app = express()
// Recomendable quitar eliminar el header con la tecnologia utilizada( express ) Para evitar bulnerabilidades
app.disable('x-powered-by')

// Se puede pasar como parametrop que rutas deseas que pasen por middlewqare
// app.use('/api/**', (req, res, next) => {}
app.use((req, res, next) => {
  // tracking a bbdd, controlar cookies, autorizar. Tratar la request
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })
  req.on('end', () => {
    const data = JSON.parse(body)
    req.body = data
    next()
  })
})

// Forma simplificada del middleware anterior
// app.use(express.jsoon())

app.get('/pokemon/ditto', (req, res) => {
  res.json(dataJson)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('<h1>404 - Not found</h1>')
})

app.listen(PORT, () => {
  console.log(`El servidor esta escuchando en el puerto http://localhost:${PORT}`)
})

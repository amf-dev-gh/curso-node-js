const express = require('express')
const dataJson = require('./pokemon/ditto.json')
const PORT = process.env.PORT ?? 3000

const app = express()
// Recomendable quitar eliminar el header con la tecnologia utilizada( express ) Para evitar bulnerabilidades
app.disable('x-powered-by')

app.get('/pokemon/ditto', (req, res) => {
  res.json(dataJson)
})

app.post('/pokemon', (req, res) => {
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })
  req.on('end', () => {
    const data = JSON.parse(body)
    res.status(201).json(data)
  })
})

app.use((req, res) => {
  res.status(404).send('<h1>404 - Not found</h1>')
})

app.listen(PORT, () => {
  console.log(`El servidor esta escuchando en el puerto http://localhost:${PORT}`)
})

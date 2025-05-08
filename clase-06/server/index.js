import express from 'express'

const PORT = process.env.PORT ?? 3000

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Esto es el chat</h1>')
})

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`)
})

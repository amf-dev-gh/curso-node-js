import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'

const app = express()

app.use(json())

app.use(corsMiddleware())

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'Inicio App' })
})

// Obtener el ruteo a partir de /movies
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto http://localhost:${PORT}`)
})

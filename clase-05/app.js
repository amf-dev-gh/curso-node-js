import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'

export const createApp = ({ movieModel }) => {
  const app = express()

  app.use(json())

  app.use(corsMiddleware())

  app.disable('x-powered-by')

  app.get('/', (req, res) => { res.json({ message: 'Inicio App' }) })

  app.use('/movies', createMovieRouter({ movieModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto http://localhost:${PORT}`)
  })
}

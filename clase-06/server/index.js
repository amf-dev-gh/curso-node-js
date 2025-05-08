import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

dotenv.config()
const PORT = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {}
})

const db = createClient({
  url: 'libsql://elegant-huntara-andres94dev.aws-eu-west-1.turso.io',
  authToken: process.env.DB_TOKEN
})

await db.execute('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT);')

io.on('connection', (socket) => {
  console.log('A user has connected!')
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
  socket.on('chat message', async (msg) => {
    let result
    try {
      result = await db.execute({
        sql: 'INSERT INTO messages (content) VALUES (:content)',
        args: { content: msg }
      })
    } catch (error) {
      console.error(error)
      return
    }
    io.emit('chat message', msg, result.lastInsertRowid.toString())
  })
})

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`)
})

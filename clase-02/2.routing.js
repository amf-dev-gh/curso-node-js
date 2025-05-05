const http = require('node:http')

const jsonDitto = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(jsonDitto))
        default:
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.statusCode = 404
          return res.end('<h1>404 - Not Found</h1>')
      }
    // eslint-disable-next-line no-fallthrough
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            // llama a la bbdd y guarda la info
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            res.end(JSON.stringify(data))
          })
          break
        }
        default: {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.statusCode = 404
          return res.end('<h1>404 - Not Found</h1>')
        }
      }
  }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
  console.log(`El servidor esta escuchando en el puerto http://localhost:${server.address().port}`)
})

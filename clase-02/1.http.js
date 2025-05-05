const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  // res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200 // es el estado de respuesta por defecto
    // res.end('Bienvenido a la página de inicio')
    res.end('<h1>Bienvenido a la página de inicio</h1>')
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('<h1>Contáctanos</h1>')
  } else if (req.url === '/imagen-solicitada.png') {
    fs.readFile('./logo.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal server error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404
    res.end('<h1>Not Found</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`El servidor esta escuchando en el puerto http://localhost:${server.address().port}`)
})

// Codigos de estado
// 100-199: Respuestas informativas
// 200-299: Respuestas satisfactorias
// 300-399: Redirecciones
// 400-499: Errores del cliente
// 500-599: Errores del servidor
// http.cat (Web donde se pueden ser los estados con fortos de gatis)

// Codigos mas cumunes y básic-- os
// 200 : OK
// 301 : Ruta movida permanentemente y redireccionar
// 400 : Mala peticion -> Bad Request
// 404 : Peticion no encontrada -> Not Found
// 403 : No autorizado para acceder -> Unauthorized
// 500 : Error en servidor -> Internal server Error

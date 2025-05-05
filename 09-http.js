const http = require('node:http')
const { findAviablePort } = require('./10-free-port')

const desiredPort = process.env.PORT ?? 3000

console.log(process.env)

const server = http.createServer((req, res) => {
  console.log('Request recibida')
  res.end('Hola Mundo')
})

// // Colocar puerto 0 como puerto por defecto para que seleccione un puerto que no este en uso
// server.listen(0, () => {
//   console.log(`El servidor esta escuchando en el puerto http://localhost:${server.address().port}`) // Esto obtiene el puerto en eque se desplego el servidor
// })

findAviablePort(desiredPort).then(port => {
  server.listen(0, () => {
    console.log(`El servidor esta escuchando en el puerto http://localhost:${port}`) // Esto obtiene el puerto en eque se desplego el servidor
  })
})

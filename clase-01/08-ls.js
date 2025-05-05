const fs = require('node:fs')

// Process es uno de los objetos globales. PErmite obtener informacion de rutas actuales variables de entorno en momento de ejecucion
// En este caso los argumentos son los que le llegan al ejecutar el archivo
// En este caso ---> node 08-ls.js ./cjs
const folder = process.argv[2] ?? '.'

// Pertenece a file system. indicandole un punto lee la ruta donde se encuentra el archivo
fs.readdir(folder, (err, files) => {
  if (err) {
    console.log('Error al leer el directiorio', err)
    return
  }

  files.forEach(file => {
    console.log(file)
  })
})
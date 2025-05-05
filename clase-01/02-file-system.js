// File system uno de los modulos mas utililzados. Se importa como 'node:fs'
const fs = require('node:fs')

const stats = fs.statSync('./archivo.txt')

console.log(
  stats.isFile(), // si es un archivo
  stats.isDirectory(), // Si es un directorio
  stats.isSymbolicLink(), // si es un enlace simbolico
  stats.size // tamaño en bytes
)
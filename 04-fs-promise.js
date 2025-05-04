// Forma asincrona de leer archivos pero con promesas

const fs = require('node:fs/promises') // Se debe importar el modulo con el /promises
const {promisify} = require('node:util') // Utra manera es utilizando el transformador de callback a promesas generico, pero si el modulo nativo lo incluye, es mejor utilizarlo ya que esta integrado

const readFilePromise = promisify(fs.readFile)

console.log('Leyendo el primer archivo...')
fs.readFilePromise('./archivo.txt', 'utf-8').then(
  text => console.log(text)
)

console.log("\nHacer algo mientras lee los archivos")

console.log('\nLeyendo el segundo archivo...')
fs.readFilePromise('./archivo2.txt', 'utf-8').then(
  text => console.log(text)
)
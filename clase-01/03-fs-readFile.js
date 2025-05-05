// Forma asincrona de leer archivos


const { error } = require('node:console')
const fs = require('node:fs')

console.log('Leyendo el primer archivo...')
fs.readFile('./archivo.txt', 'utf-8', (error, text) => { // El callback se ejecuta cuando terminma de leer el archivo. mientas tanto sigue con el codigo
  console.log(text)
})

console.log("\nHacer algo mientras lee los archivos")

console.log('\nLeyendo el segundo archivo...')
fs.readFile('./archivo2.txt', 'utf-8', (error, text) => {
  console.log(text)
})
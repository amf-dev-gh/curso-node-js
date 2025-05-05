// Es necesario importar usando ES Module, porque soportan el async

import { readFile } from "node:fs/promises"; 

console.log('Leyendo el primer archivo...')
const text = await readFile('./archivo.txt', 'utf-8')
console.log(text)

console.log("\nHacer algo mientras lee los archivos")

console.log('\nLeyendo el segundo archivo...')
const text2 = await readFile('./archivo2.txt', 'utf-8')
console.log(text2)
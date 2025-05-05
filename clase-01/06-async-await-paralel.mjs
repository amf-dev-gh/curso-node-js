import {readFile} from 'node:fs/promises';

// Ejecuta todo al mismo tiempo (en paralelo) y luego de que termina todo, recien ahi envia las respuestas
Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(([text1, text2]) => {
  console.log(text1)
  console.log(text2)
})
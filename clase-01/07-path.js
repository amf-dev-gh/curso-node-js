// import path from 'node:path'; ---> Esta seria lo mejor

const path = require('node:path')

// Esto dice como es la barra separadora en el sistema operativo actual
console.log(path.sep)

// Unir rutas con path.join. Detecta automaticamente cual es el separador segun el sistema operativo y crea el path
const filePath = path.join('content', 'subfolder', 'test.txt')
// \content\subfolder\test.txt
console.log(filePath)

// Esto retorna el nombre del último trozo del patch que indica el nombre de la carpeta o archivo actual
const base1 = path.basename('/content/subfolder/test2.txt')
console.log(base1)

// Mismo que el anterior pero elimina la extension
const base2 = path.basename('/content/subfolder/test2.txt', '.txt')
console.log(base2)

// Retorna la extension del archivo
const extension = path.extname('/content/subfolder/test2.txt')
console.log(extension)
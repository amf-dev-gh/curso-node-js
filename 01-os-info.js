// Modulos nativos. Recomendado no utilizar el nombre del modulo directamentre.
// en vez de const od = require('os') -> Para el sistema operativo
// utilizar const od = require('node:os') -> agregar el node:<nombre-del-modulo>

const os = require('node:os')

console.log('Información de mi sistema operativo')
console.log('-----------------------------------')
console.log('Nombre del sistema operativo', os.platform())
console.log('Versión del sistema operativo', os.release())
console.log('Arquitectura', os.arch())
console.log('Total CPUs', os.cpus().length)
console.log('Info CPUs', os.cpus())
console.log('Memoria libre', os.freemem()/1024/1024)
console.log('Memoria total', os.totalmem()/1024/1024)
console.log('Horas encendido', os.uptime() / 60 / 60)
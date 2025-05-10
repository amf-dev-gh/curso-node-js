# curso-node-js

Clases practicas de Node JS del curso dictado por midudev

Node Js es mono hilo, esta basado en eventos. Trabaja de forma sincrona y asincrona.

Intalaador para manejar varias versiones de Node

nvm-windows.

Descargar ejecutable e instalar.

### Comandos básicos:

- nvm current                  : Display active version.
- nvm install <version> [arch] : The version can be a specific version, "latest" for the latest current version, or "lts" for the most recent LTS version. Optionally specify whether to install the 32 or 64 bit version  (defaults to system arch). Set [arch] to "all" to install 32 AND 64 bit versions. Add --insecure to the end of this command to bypass SSL validation of the remote download server.
- nvm list [available]         : List the node.js installations. Type "available" at the end to see what can be installed. Aliased as ls.
- nvm uninstall <version>      : The version must be a specific version.
- nvm upgrade                  : Update nvm to the latest version. Manual rollback available for 7 days after upgrade. "newest" is the latest installed version. Optionally specify 32/64bit architecture. nvm use <arch> will continue using the selected version, but switch to 32/64 bit mode.
- nvm reinstall <version>      : A shortcut method to clean and reinstall a specific version.
- nvm [--]version              : Displays the current running version of nvm for Windows. Aliased as v.

## NPM (Node Package Manager)

Es el administrador de paquetes de Node que viene integrado. (Es tanto un administrador como una linea de comandos)

_Comandos básicos_

- npm --version ---> Versin de npm instalada
- npm init ---> Iniciar un proyecto de node ( crear el package.json paso a paso rellenando los campos solicitados)
- npm init -y ---> Iniciar un proyecto de node por defecto.
- npm install <nombre-de-la-dependencia> ---> Instalar depenedencias en el proyecto ( en vez de install puede poner solo 'i')
- npm uninstall <nombre-de-la-dependencia> ---> Desinstalar depenedencias en el proyecto
- Si se agrega el -E al final instala la ultima versión exacta (como dependencia de produccion y sin el ^)

Existen dependencias que son utilidades que no necesita el proyecto para funcionar, pero que si siven para crearlo.
Estas se llaman dependencias de desarrollo.

```
npm i <nombre-de-la-dependencia> -D
```
Instala una dependencia pero como dependencia de desarrollo

Para pasar una variable de entorno al momento de ejecutar un archivo se puede pasar en WINDOWS con 'set'

```
set PORT=1234 && node 09-http.js
```

Para levantar un servidor y ver los cambios automaticamente sin tener que cerrarlo y volverlo a ejecutar

```
node --watch <archio.js>
```
Se puede añadir a los scripts del package.json como se ejecuta el servidor
```json
"scripts": {
  "dev": "node --watch 1.http.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

y se ejecuta con NPM
```
npm run dev -> Esto ejecuta el script de dev
```

## **Express**, Es un Framework de Node, que permite hacer aplicaciones web, apis, y es utilizado por otros frameworks

**Para instalar dependencia**
```
npm install express
```

### Los _*Middleware*_ son interceptores que tratan las request hechas a la api y hacen validaciones, ejecutan algo antes de continuar con la respuesta, confirmandolo con next()

```javascript
app.use((req, res, next) => {
  console.log('Entro al middleware')
  next()
})
```

## ↕️ Las _REST API_

Es una arquitectura de software. (Representation State Transfer)

**Principios fundamentales:**
- Escalabilidad
- Simplicidad
- Portabilidad
- Fiabilidad
- Visibilidad
- Facil de mantener/modificar

**Recursos (Resources)**
- Puede ser un usuario, una lista de usuarios, de productos, etc.
Cada recurso de identifica con una **URL**

**Vervos HTTP**
- Sirven para definir las operaciones que se pueden realizar con los recursos. El *CRUD* (Create, Read, Update, Delete)
GET, POST, PUT, PATCH, DELETE...

**Diferencias entre POST, PUT, PATCH*
- POST: Crear un nuevo recurso en el servidor (/user)
- PUT: Actualizar totalmente un resurso existente o crearlo si no existe (/user/123-abc)
- PATCH: Actualizar un resucrso parcialmente (/user/123-abc)


**Representaciones**
- El cliente debería decidir la representacion del recurso (JSON, XML, HTML, etc.)

**Stateless**
- Cada solicitud debe contener la info necesaria para entender la solicitud. No debe mantener informacion en el servidor.
(El cliente debe enviar toda la info necesaria para procesar la petición)

## ✅ Para Validaciones se utilizará **ZOD**

```
npm install zod
```

Forma de validar Ej.:

```javascript
const z = require('zod')

const user = z.object({
  name: z.string({
    invalid_type_error: 'Name must be string',
    required_error: 'Name is required'
  }),
  secondName: z.string().default('')
  age: z.number().int().positive().min(0).max(120),
  role: z.array(z.enum(['ADMIN','USER']),
    {
      required_error: 'Role is required',
      invalid_type_error: 'Role must be an array of enum Roles'
    })
})
```

## ⛔ El CORS (Cross Origin Resource Sharing)

Mecanismo que solo funciona en los navegadores.
Este mecanismo de seguridad web, permite a un servidor web indicar a un navegador que una solicitud de un origen (dominio, esquema, puerto) diferente puede ser permitida

Para permitir el acceso desde cualquier origen se utiliza el *. Pero de puede colocar la URL que se quiere autorizar
```javascript
res.header('Access-Control-Allow-Origin', '*')
```

El CORS no actua de igual manera con todos los metodos
*Metodos "Normales"*: GET,HEAD y POST
*Metodos "Complejos"*: PUT, PATCH y DELETE

Para los metodos complejos el CORS utilica CORS Pre-Flight (Hace una petición previa con el metodo OPTIONS). Entonces hay que agregar a este metodo el mecanismo
```javascript
app.options('/users/....', (req, res) => {
  const origin = req.header('origin')
  if(ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  }
  res.send(200)
})
```

Forma de habilitar CORS solo con una depednencia. **Pero hace que sea abierta a cualquier origen*

```
npm install cors
```

y en el proyecto solo se importa y se utiliza en la app
```javascript
const cors = require('cors')

app.use(cors())
```
Recibe parametros configurables **

## 🏗️ MVC (Modelo Vista Controlador)

Es un patrón de arquitectura que separa la aplicacion en estos 3 grupos
- MODELO -> **Lógica de negocio**, estructura de datos, comprobar integridad de los datod (ej. bases de datos)
- CONTROLADOR -> **Intermiediario** entre la vista y el modelo. Orquesta las solicitudes y delega al modelo
- VISTA -> **Interactuar** con el cliente. (Interfaz de usuario) json, html, xml

VISTA <=> CONTROLADOR <=> MODELO

## ✨ Instalar Eslint en un proyecto para ver errores en desarrollo

```
npm i standard -D
```

En el package.json agregar

```json
"devDependencies": {
  "standard": "version"
},
"eslintConfig": {
  "extends": "standard"
}
```

## 🗂️ Instalar y conectar MySQL

Instalar la dependencia de 'mysql2' (recomendada y mas actualizada)
```
npm install --save mysql2
```

**Crear conexión**
```javascript
import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'mi-contraseña',
  database: 'mi-base-de-datos'
}

const connection = await mysql.createConnection(config)
```

**Hacer consultas EJ:**
```javascript
const [data, tableInfo] = await connection.query('SELECT * FROM table-name;')
console.log(data)
```

## 🗂️ Instalar y conectar MySQL (con dependecia libsql)

Instalar dependencia @libsql y dotenv para las variables de entorno 
(crear el archivo .env en la base del proyecto con las variables EJ: DB_TOKEN="eyasdffaslkfm....")
```
npm install @libsql/client dotenv
```

Importar, crear la conexión, y crear una tabla a modo de ejemplo.
```javascript
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'
dotenv.config()

const db = createClient({
  url: 'libsql://elegant-huntara-andres94dev.aws-eu-west-1.turso.io',
  authToken: process.env.DB_TOKEN
})

await db.execute('CREATE TABLE IF NOT EXISTS table-name (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT);')
```

## 🛜 Protocolos

Son un conjunto de normas, pautas o instrucciones que sirven para guiar las acciones durante el intercambio de información

- HTTP -> Son Stateless (cacheable). Se usa normalmente para recursos, api rest (unidireccional)
- Web Sockets -> Son statefull (no cacheable). Se usa para trasnportar informacion con poca latencia, realtime (bidireccional)

(Protocolos de comunicación que se basan en intercambio de mensajes entre un cliente y un servidor. Utilizan TCP como protocolo de transporte.
la diferencia es que los web sockets lo pueden hacer en cualquier momento y http solo cuando se requiere)

## 💬 Implementar Web Socket en el proyecto
Instalación
```
npm install socket.io
```

Para crear el servidor base con socket.io
```javascript
import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

const PORT = process.env.PORT ?? 3000
const app = express()
const server = createServer(app)
const io = new Server(server)

io.on('connection', async (socket) => {
  console.log('A user has connected!')
  
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

  socket.on('chat message', async (msg) => {
    let result
    const username = socket.handshake.auth.username ?? 'anonymus'
    try {
      result = await db.execute({
        sql: 'INSERT INTO messages (content, user) VALUES (:msg, :username)',
        args: { msg, username }
      })
    } catch (error) {
      console.error(error)
      return
    }
    io.emit('chat message', msg, result.lastInsertRowid.toString(), username)
  })

  // console.log(socket.handshake.auth) ---> Aquí viene toda la información 

  if (!socket.recovered) {
    try {
      const results = await db.execute({
        sql: 'SELECT id, content, user FROM messages WHERE id > ?',
        args: [socket.handshake.auth.serverOffset ?? 0]
      })
      results.rows.forEach(row => {
        socket.emit('chat message', row.content, row.id.toString(), row.user)
      })
    } catch (error) {
      console.log('Error gettin messages', error)
    }
  }
})

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + 'index.html')
})

server.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`)
})
```
*En vez de 'escuchar' a la app se crea el servidor a partir de ella y se escucha al servidor*

En el cliente (HTML)
```html
<script type="module">
  import { io } from 'https://cdn.socket.io/4.8.1/socket.io.esm.min.js'

  const socket = io({
  auth: {
    token: '<token>',
    username: '<nombre-usuario',
    serverOffset: 0
    }
  })

  const form = document.getElementById('form')
  const input = document.getElementById('message')
  const messages = document.getElementById('messages')

  socket.on('chat message', (msj) => {
    const item = `<li>${msj}</li>`
    messages.insertAdjacentHTML('beforeend', item)
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.value) {
      socket.emit('chat message', input.value)
      input.value = ''
    }
  })
</script>
```

### ℹ️ Morgan

Morgan es una herramienta (midelware) que sirve para generar logs de express para tener información de las request en tiempo real
```
npm install morgan
```

## 🔒 Autenticación con JSON Web Token (JWT)
Son como un "ticket de acceso" digital que contiene información en formato JSON y está firmado digitalmente, garantizando su integridad y autenticidad.

**Istalar dependencia en el proyecto**
```
npm install jsonwebtoken
```

**Para generar un token**
```javascript
import jwt from 'jsonwebtoken'

const token = jwt.sign({ id: user._id, username: user.username }, 'clave-segura-secreta', { expiresIn: '1h' })
```
*En el primer parametro se le pasan los datos o informacion que llevará el JWT encriptada.

*En el segundo parametro la clave secreta que usara para codificar y decodificar los tokens.

*En el tercer patrámetro el tiempo que sera válido el token antes de que deje de funcionar.

**Para obtener la información de un token**
```javascript
const data = jwt.verify(token, 'clave-segura-secreta')
```
*Si el token es correcto la información que se obtiene es la misma que se le pasa cuando se crea ( en este caso { id, username })

## 🍪 Manejo de Cookies
Es un midelware de express para transportar informacion entre el cliente y el servidor

**Istalar dependencia en el proyecto**
```
npm install cookie-parser
```

**Enviar la cookie en la response del servidor**
```javascript
res.cookie(
      'access_token', // Nombre de la cookie
      token, // Información que lleva
      { //CONFIGURACIÓN DE LA COOKIE
        httpOnly: true, // Solo se puede acceder a la cookie desde el servidor, no desde el cliente(js, navegador)
        secure: process.env.NODE_ENV === 'production', // Solo se pùede acceder a la cookie en https
        sameSite: 'strict', // Solo se pùede acceder a la cookie desde el mismo dominio
        maxAge: 1000 * 60 * 60 // Tiempo de expiración de la cookie
      })
    .send({ user })
```
*Solo se envia si la ruta necesita estrictamente la data para funcionar

**Borrar las cookies**
```javascript
res.clearCookie('access_token').json({ message: 'OK' })
```

---
_**Repo Original de Midudev**_ [curso-node-js](https://github.com/midudev/curso-node-js)
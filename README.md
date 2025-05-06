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

### NPM

Node Package Manager

Es el administrador de paquetes de Node que viene integrado. (Es tanto un administrador como una linea de comandos)

_Comandos básicos_

- npm --version ---> Versin de npm instalada
- npm init ---> Iniciar un proyecto de node ( crear el package.json paso a paso rellenando los campos solicitados)
- npm init -y ---> Iniciar un proyecto de node por defecto.
- npm install <nombre-de-la-dependencia> ---> Instalar depenedencias en el proyecto ( en vez de install puede poner solo 'i')
- npm uninstall <nombre-de-la-dependencia> ---> Desinstalar depenedencias en el proyecto

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
```
"scripts": {
  "dev": "node --watch 1.http.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

y se ejecuta con NPM
```
npm run dev -> Esto ejecuta el script de dev
```

## **Express**, Es un Framework de Node, que permite hacer aplicaciones web, apis, y es utilizado por otros frameworks

Para instalar (como dependencia de produccion y version exacta <sin el ^>)

```
npm install express -E
```

### Los _*Middleware*_ son interceptores que tratan las request hechas a la api y hacen validaciones, ejecutan algo antes de continuar con la respuesta, confirmandolo con next()

```
app.use((req, res, next) => {
  console.log('Entro al middleware')
  next()
})
```

## Las _REST API_

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

### Para Validaciones se utilizará **ZOD**

```
npm install zod -E
```

Forma de validar Ej.:

```
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

### El CORS (Cross Origin Resource Sharing)

Mecanismo que solo funciona en los navegadores.
Este mecanismo de seguridad web, permite a un servidor web indicar a un navegador que una solicitud de un origen (dominio, esquema, puerto) diferente puede ser permitida

Para permitir el acceso desde cualquier origen se utiliza el *. Pero de puede colocar la URL que se quiere autorizar
```
res.header('Access-Control-Allow-Origin', '*')
```

El CORS no actua de igual manera con todos los metodos
*Metodos "Normales"*: GET,HEAD y POST
*Metodos "Complejos"*: PUT, PATCH y DELETE

Para los metodos complejos el CORS utilica CORS Pre-Flight (Hace una petición previa con el metodo OPTIONS). Entonces hay que agregar a este metodo el mecanismo
```
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
npm install cors -E
```

y en el proyecto solo se importa y se utiliza en la app
```
const cors = require('cors')

app.use(cors())
```
Recibe parametros configurables **

## MVC (Modelo Vista Controlador)

Es un patrón de arquitectura que separa la aplicacion en estos 3 grupos
- MODELO -> **Lógica de negocio**, estructura de datos, comprobar integridad de los datod (ej. bases de datos)
- CONTROLADOR -> **Intermiediario** entre la vista y el modelo. Orquesta las solicitudes y delega al modelo
- VISTA -> **Interactuar** con el cliente. (Interfaz de usuario) json, html, xml

VISTA <=> CONTROLADOR <=> MODELO

### Instalar Eslint en un proyecto para ver errores en desarrollo

```
npm i standard -D
```

En el package.json agregar

```
"devDependencies": {
  "standard": "17.1.2"
},
"eslintConfig": {
  "extends": "standard"
}
```

**Repo Original de Midudev**

💾 [curso-node-js](https://github.com/midudev/curso-node-js)
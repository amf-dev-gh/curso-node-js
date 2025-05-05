# curso-node-js

Clases practicas de Node JS del curso dictado por midudev

Node Js es mono hilo, esta basado en eventos. Trabaja de forma sincrona y asincrona.

Intalaador para manejar varias versiones de Node

nvm-windows.

Descargar ejecutable e instalar.

Comandos básicos:

nvm current                  : Display active version.
nvm install <version> [arch] : The version can be a specific version, "latest" for the latest current version, or "lts" for the most recent LTS version. Optionally specify whether to install the 32 or 64 bit version  (defaults to system arch). Set [arch] to "all" to install 32 AND 64 bit versions. Add --insecure to the end of this command to bypass SSL validation of the remote download server.
nvm list [available]         : List the node.js installations. Type "available" at the end to see what can be installed. Aliased as ls.
nvm uninstall <version>      : The version must be a specific version.
nvm upgrade                  : Update nvm to the latest version. Manual rollback available for 7 days after upgrade. "newest" is the latest installed version. Optionally specify 32/64bit architecture. nvm use <arch> will continue using the selected version, but switch to 32/64 bit mode.
nvm reinstall <version>      : A shortcut method to clean and reinstall a specific version.
nvm [--]version              : Displays the current running version of nvm for Windows. Aliased as v.

## NPM

Node Package Manager

Es el administrador de paquetes de Node que viene integrado. (Es tanto un administrador como una linea de comandos)

Comandos básicos
npm --version ---> Versin de npm instalada
npm init ---> Iniciar un proyecto de node ( crear el package.json paso a paso rellenando los campos solicitados)
npm init -y ---> Iniciar un proyecto de node por defecto.
npm install <nombre-de-la-dependencia> ---> Instalar depenedencias en el proyecto ( en vez de install puede poner solo 'i')

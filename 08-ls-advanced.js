const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.log(pc.red(`Error al leer el directiorio ${folder}`))
    process.exit(1)
  }

  const filePromises = files.map(async file => {
    const filePath = path.join(folder, file)
    let stats

    try {
      stats = await fs.stat(filePath) // informacion del archivo
    } catch {
      console.log(`❌ No se pudo leer el archivo ${filePath}`)
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'D' : 'F'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    return `${pc.bgGreenBright(fileType)} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.toString().padStart(10))} ${pc.yellow(fileModified)}`
  })

  const filesInfo = await Promise.all(filePromises)
  filesInfo.forEach(info => console.log(info))
}

ls(folder)

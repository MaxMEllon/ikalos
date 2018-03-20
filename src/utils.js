import fs from 'fs'
import g from 'glob'

export const glob = () => {
  return new Promise((resolve, reject) =>
    g(`data/${'*'}.json`, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  )
}

export const open = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

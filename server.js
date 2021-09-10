import express from 'express';
var app = express()
import path from 'path'
import fs from 'fs'
import datee from 'date-and-time'
var hold = []
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  var now = Date()
  var file_name = datee.format(new Date(), 'DD-MM-YYYY-hh_mm_ss_A.txt')

  fs.writeFile(file_name, now, (err) => {
    if (err) console.log(err)
  })
  res.send(`a file named ${file_name} was created`)

  fs.readdir('./', (err, files) => {
    hold = []
    if (err) console.log(err)
    else
      files.map((item) => {
        if (path.extname(item) == '.txt') hold.push(item)
      })
  })
})

app.get('/alldates', (req, res) => {
  res.status(200)
  res.send(
    `${hold
      .map((item) => {
        return `<li>${item}</li>`
      })
      .join(' ')}`
  )
})

app.listen(port)

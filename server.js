const express = require('express');
const cors = require('cors');
const fs = require('fs');
const uniqid = require('uniqid');
// const Oil_es = require('./config')

const PORT = 8080
const path = './oil_es.txt'

const app = express()
app.use(express.json())
app.use(cors())


app.post('/create', async(req, res)=> {
  const dataServer = req.body

  dataServer.id = uniqid();

  if(path) {
    fs.readFile(path, 'utf-8', (err, data) => {
      if(err) throw err;
      const fileData = JSON.parse(data)
      const writeData = [...fileData, dataServer]
      const writeDataFile = JSON.stringify(writeData)
      fs.writeFile('oil_es.txt', writeDataFile, (err) => {
        if(err) throw err;
        console.log('Data has been added!');
      });
    })
  } else {
    fs.open('oil_es.txt', 'r+', (err) => {
      if(err) throw err;
      console.log('File created');
      fs.appendFile('oil_es.txt', data, (err) => {
        if(err) throw err;
        console.log('Data has been added!');
      });
  });
  }
  res.send({
    "massage": 'Data create'
  })
})


app.get('/oil_es', (req, res) => {
  let DataDB;
  fs.readFile(path, 'utf-8', (err, data) => {
    if(err) throw err;
    DataDB = data
    res.send(JSON.parse(DataDB))

  })
})

app.delete('/oil_es:id', (req, res) => {
 console.log(req.body)
})

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

function writeFiles(name, data) {
  fs.writeFile(name, data, (err) => {
    if(err) throw err;
    console.log('Data has been added!');
  });
}
function readFiles(path) {
  let dataFiles;
  fs.readFile(path, 'utf-8', (err, data) => {
    if(err) throw err;
    dataFiles = JSON.parse(data)
    return dataFiles
  });
  
}

function createFiles(name) {
  fs.open(name, 'r+', (err) => {
    if(err) throw err;
    console.log('File created');
  });
}


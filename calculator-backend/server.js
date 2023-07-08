const express = require('express')
const app = express()
const fs = require('fs')
const port = 3001
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/number', (req, res) => {
  fs.readFile('./data/numberData.json', 'utf-8', (err, data) => {
    if (err) throw err
    res.send(data)
})
})

app.post('/number', (req, res) => {
const { number } = req.body

const updateData = JSON.stringify({"storedNumber": number}) 


 fs.writeFile('data.json', updateData, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('JSON file has been updated.');
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
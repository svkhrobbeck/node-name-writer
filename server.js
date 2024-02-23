require('express-async-errors')
const hbs = require('express-handlebars')
const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT

app.engine('.hbs', hbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
})

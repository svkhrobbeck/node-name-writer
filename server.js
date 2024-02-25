require('express-async-errors')
const express = require('express')
const hbs = require('express-handlebars')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
const port = process.env.PORT

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static('./public'))

app.engine('.hbs', hbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

// api endpoints(pages)
app.use('/', require('./routes/nameWriter'))

app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
})

const {Pool} = require('pg')

const db  =new Pool({
user:'postgres',
host:'localhost',
database: 'CineArt',
password:'postgres',
port:5432
})

module.exports = db
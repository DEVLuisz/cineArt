const express = require("express");
const app = express();
const session = require("express-session");
const db = require("./DB/conexao");
const routes = require('./Routes/routes');
const path = require('path');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "font-src 'self' https://fonts.gstatic.com"); 
  return next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'text/javascript');
    }
  }
}));

async function lista() {
  await db.connect;
  resultado = await db.query("SELECT * FROM ADMs");
  console.log(resultado.rows);
}
lista();

app.use('/', routes);

app.listen(8080);

const Koa = require('koa');
const Router = require('@koa/router');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const path = require('path');

const initRoute = require('./router');
const controller = require('./controller')
const mysql = require('./mysql');

const app = new Koa();
const router = new Router();

render(app, {
  root: path.join(__dirname, 'view'),
});

initRoute({
  router,
  controller
});

mysql.connect();
mysql.initSession(app);
mysql.initTable();

app.use(bodyParser());
app.use(router.routes());
app.use(require('koa-static')(path.join(__dirname, 'public')));

app.listen(3000);
console.log('listening http://localhost:3000');

app.on('error', function (err, ctx) {
  console.log(err.stack);
});

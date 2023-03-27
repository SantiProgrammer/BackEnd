const Koa = require("koa");
const { koaBody } = require("koa-body");

const MongoConnect = require('./utils/MongoConnectSingleton');

MongoConnect();

const app = new Koa();

app.use(koaBody());

let { students } = require("./students");

app.use(students.routes());

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log('✅ Success:', `App listen at => http://localhost:${server.address().port}`);
});
server.on("error", (error) => console.log("Error en Servidor Koa:", error));
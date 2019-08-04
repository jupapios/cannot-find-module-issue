const server = require('./dist/server');
server.app.use(function middleWare(req, res, next) {
  console.log('it works!');
  next();
});

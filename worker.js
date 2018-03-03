var SCWorker = require('socketcluster/scworker');
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var morgan = require('morgan');
var healthChecker = require('sc-framework-health-check');

var webpack = require('webpack');
var webpackConfig = require('./setup/webpack.dev.config');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

class Worker extends SCWorker {
  run() {
    console.log('   >> Worker PID:', process.pid);
    var environment = this.options.environment;
    console.log('environment is ' + environment);

    var app = express();
    var httpServer = this.httpServer;
    var scServer = this.scServer;

    if (environment === 'dev') {
      // Log every HTTP request. See https://github.com/expressjs/morgan for other
      // available formats.
      app.use(morgan('dev'));

      var compiler = webpack(webpackConfig);
      var devMiddleware = webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath
      });
      var hotMiddleware = webpackHotMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath
      });

      app.use(devMiddleware);
      app.use(hotMiddleware);
    };

    app.use(serveStatic(path.resolve(__dirname, 'public')));

    // Add GET /health-check express route
    healthChecker.attach(this, app);

    httpServer.on('request', app);

    app.get('*', (req, res) => {
      res.sendFile(__dirname + '/public/index.html');
    });

    /*
      In here we handle our incoming realtime connections and listen for events.
    */
    var count = 0;

    scServer.on('connection', function (socket) {

      // Some sample logic to show how to handle client events,
      // replace this with your own logic

      socket.on('sampleClientEvent', function (data) {
        count++;
        console.log('Handled sampleClientEvent', data);
        scServer.exchange.publish('sample', count);
      });

      socket.on('disconnect', function () {
        console.log('websocket disconnected');
      });
    });
  }
}

new Worker();

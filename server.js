/**
 * Author: Magic·Zhang <magic@foowala.com>
 * Module description: 启动
 */
import server from './config/hapi'
import config from './config/env';
import bluebird from 'bluebird';
import mongoose from 'mongoose';
import util from 'util';
import glob from 'glob';

const debug = require('debug')('foowala-pos-service:server');

Promise = bluebird;
// plugin bluebird promise in mongoose
mongoose.Promise = Promise;
mongoose.connect(config.mongo.db, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
    console.error(`unable to connect to database: ${config.db}`)
});


// print mongoose logs in dev env
if (config.mongo.debug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

server.start((err) => {
    if (err) { console.log(err); }
    const routes = glob.sync('./server/routes/*.route.js');
    routes.forEach(function (file) {
      console.log('Loading route file ' + file);
      let route = require(file);
      server.route(route.default || route)
    });

    server.log('info', 'Server running at: ' + server.info.uri);
});
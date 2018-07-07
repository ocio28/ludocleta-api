'use strict';
var {fetchGames, getGame} = require('./api/Games')

module.exports.fetchGames = (event, context, callback) => handle(event, context, callback, fetchGames)
module.exports.getGame = (event, context, callback) => handle(event, context, callback, getGame)

function handle(event, context, callback, handler) {
  context.callbackWaitsForEmptyEventLoop = false;
  handler(event, context, callback)
}

const {parseBody, success, error, fail} = require('../utils/Reply')
const client = require('../lib/Mongo')

module.exports.fetchGames = function(event, context, cb) {
  client.find({}, 'games').then(result => {
    success(result.map(g => ({
      id: g.uuid,
      index: g.index,
      name: g.name,
      title: g.title,
      url: g.url,
      html5: g.html5,
      icons: g.icons,
      style: g.style
    })), cb)
  }).catch(e => error(e, cb))
}

module.exports.getGame = function(event, context, cb) {
  let body = parseBody(event.body);
  if (!body || body === null) {
    return error('body debe ser json', cb)
  }
  client.find({uuid: body.id}, 'games').then(result => {
    if (result.length === 0) {
      return fail('El juego no existe', cb)
    }
    let game = result[0]
    success({
      name: game.name,
      instructions: game.instructions
    }, cb)
  }).catch(e => error(e, cb))
}

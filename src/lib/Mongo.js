var MongoClient = require('mongodb').MongoClient;

const url = process.env.MLAB_URL
let client = null;

function connect() {
  return new Promise((s, r) => {
    if (client) {
      s(client)
    } else {
      MongoClient.connect(url, function(err, c) {
        if (err) return r(err);
        client = c.db('ludocleta')
        s(client)
      });
    }
  })
}

module.exports.find = (query, collection) => {
  return new Promise((s, r) => connect().then(c => {
    c.collection(collection).find(query).toArray(function(err, result) {
      if (err) return r(err);
      s(result);
    });
  }))
}

module.exports.save = (obj, collection) => {
  return new Promise((s, r) => connect().then(c => {
    c.collection(collection).insertOne(obj, function(err, result) {
      if (err) return r(err);
      s(result.insertedCount)
    })
  }))
}

module.exports.update = (obj, collection, query, options) => {
  return new Promise((s, r) => connect().then(c => {
    c.collection(collection).updateOne(query, obj, options, function(err, result) {
      if (err) return r(err);
      s(result)
    })
  }))
}

module.exports.remove = (query, collection) => {
  return new Promise((s, r) => connect().then(c => {
    c.collection(collection).remove(query, function(err, result) {
      if (err) return r(err);
      s(result)
    })
  }))
}

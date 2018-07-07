module.exports.parseBody = function(body) {
  try {
    return JSON.parse(body);
  } catch(e) {
    return null;
  }
}

module.exports.success = function(obj, cb) {
  reply(200, obj, cb)
}

module.exports.fail = function(e, cb) {
  console.error('[FAIL]', e)
  reply(400, e, cb)
}

module.exports.error = function(e, cb) {
  console.error('[ERROR]', e)
  reply(500, e.message ? e.message : e, cb)
}

function reply(status, obj, cb) {
  const body = {
    status: status === 200 ? 'success' : 'error',
    data: obj
  };
  const response = {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE",
      "Access-Control-Allow-Headers": "Content-Type,Authorization"
    },
    body: JSON.stringify(body)
  };
  cb(null, response);
}

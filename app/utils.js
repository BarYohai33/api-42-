const jsonResponse = (code, message = null, data = null) => {
  return {
    'status': code,
    'message': message,
    'data': data
  }
}

const returnResponse = (res, code, message, data = null) => {
  res.status(code).json(jsonResponse(code, message, data))
}

const requestNotFound = (req, res) => {
  returnResponse(res, 404, '404 request not found')
}

const requestServerError = (req, res) => {
  returnResponse(res, 500, '500 Server error')
}

const isUserJson = (data) => {
  return (typeof data.name !== 'undefined'
    && typeof data.age !== 'undefined'
    && typeof data.gender !== 'undefined'
    && typeof data.name === 'string'
    && typeof data.age === 'number'
    && typeof data.gender === 'string')
}

module.exports = {
  returnResponse,
  requestNotFound,
  isUserJson,
  requestServerError
}

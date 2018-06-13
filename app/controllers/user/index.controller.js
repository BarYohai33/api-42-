const { 
  returnResponse,
  isUserJson
} = require('./../../utils')
const UserModel = require('./../../models/UserModel')

const UserController = {

  create: (req, res) => {
    if (! isUserJson(req.body)) {
      returnResponse(res, 400, 'user object malformed')
    } else {
      UserModel.create({
        'name': req.body.name,
        'age': req.body.age,
        'gender': req.body.gender
      })
      .then(data => {
        returnResponse(res, 200, 'user successfully created.', data)
      })
      .catch(err => {
        returnResponse(res, 500, 'Internal Server Error')
      })
    }
  },

  read: (req, res) => {
    UserModel.findOne({
      '_id': req.params.id
    }).exec().then(data => {
      returnResponse(res, 200, 'user successfully retrieved.', data)
    })
    .catch(err => {
      returnResponse(res, 404, 'user id not found')
    })
  },

  update: (req, res) => {
    if (! isUserJson(req.body)) {
      returnResponse(res, 400, 'user object malformed.')
    } else {
      UserModel.update({
        '_id': req.params.id
      }, {
        $set: {
          'name': req.body.name,
          'age': req.body.age,
          'gender': req.body.gender
        }
      }).exec().then(resp => {
        if (resp.n === 0) {
          returnResponse(res, 404, 'user id not found.')
        } else {
          returnResponse(res, 200, 'user successfully updated.')
        }
      })
      .catch(err => {
        returnResponse(res, 404, 'user id not found.')
      })
    }
  },

  delete: (req, res) => {
    UserModel.remove({
      '_id': req.params.id
    }).exec().then(resp => {
      if (resp.n === 0) {
        returnResponse(res, 404, 'user id not found.')
      } else {
        returnResponse(res, 200, 'user successfully deleted.')
      }
    })
    .catch(err => {
      returnResponse(res, 404, 'user id not found.')
    })
  }
}

module.exports = UserController

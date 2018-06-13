const { 
  returnResponse,
  returnObjToArray
} = require('./../../utils')
const UserModel = require('./../../models/UserModel')

const UsersController = {
  list: (req, res) => {
    UserModel.find().exec()
      .then(data => {
        returnResponse(res, 200, 'users list successfully retrieved.', data)
      })
      .catch(err => {
        returnResponse(res, 500, 'Internal Server Error')
      })
  }, 
   search: (req, res) => {
    const { criteria } = req.params

    UserModel.find({
      $and: [
        {
          $or: [
            {
              'name': { $regex: criteria }
            },
            {
              'age': isNaN(parseInt(criteria, 10)) ? null : parseInt(criteria, 10)
            },
            {
              'name': { $regex: criteria }
            }
          ]
        }
      ]
    }).exec().then(data => {
      returnResponse(res, 200, 'users list successfully retrieved.', data)
    })
    .catch(err => {
      returnResponse(res, 500, 'Internal Server Error')
    })
  }


}

module.exports = UsersController

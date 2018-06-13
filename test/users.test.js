const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should()

chai.use(chaiHttp)

describe('#users', () => {
  describe('/GET /users/list', () => {
    it('should show the users list', (done) => {
      chai.request(server)
        .get('/users/list')
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
})
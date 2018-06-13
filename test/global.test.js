const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should()

chai.use(chaiHttp)

describe('#global', () => {
  describe('/GET /random-uri', () => {
    it('should show 404 request not found', (done) => {
      chai.request(server)
        .get('/random-uri')
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })
})

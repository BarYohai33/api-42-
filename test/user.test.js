const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should()

chai.use(chaiHttp)

let userId = ''

describe('#user', () => {
  describe('/POST /user/create', () => {
    it('should create a new user', (done) => {
      const userObj = {
        'name': 'root',
        'age': 10,
        'gender': 'robot'
      }

      chai.request(server)
        .post('/user/create')
        .send(userObj)
        .end((err, res) => {
          res.should.have.status(200)
          userId = res.body.data._id
          done()
        })
    })
  })

  describe('/GET /user/read/:id', () => {
    it('should read user data by id', (done) => {
      chai.request(server)
        .get(`/user/read/${userId}`)
        .end((err, res) => {
          res.should.have.status(200)
          chai.expect(res.body.data._id).to.equal(userId)
          done()
        })
    })
  })

  describe('/PUT /user/update/:id', () => {
    it('should update user data by id', (done) => {
      const userObj = {
        'name': 'root',
        'age': 10,
        'gender': 'robot'
      }

      chai.request(server)
        .put(`/user/update/${userId}`)
        .send(userObj)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('/DELETE /user/delete/:id', () => {
    it('should delete user by id', (done) => {
      chai.request(server)
        .delete(`/user/delete/${userId}`)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
})

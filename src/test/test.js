const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
// const expect = chai.expect();
const should = chai.should();
var token;
var id = '4c9d97ca-7cc5-4b4b-a91d-c68ff39d6e75'

chai.use(chaiHttp);
// var log = console.log()
describe("First Test", function () {
    it("it should return a token", function (done) {
        chai.request(app)
            .post('/api/v1/auth/signin').send({
                email: 'adegbite@gmail.com',
                password: 'Update#0499'
            })
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('data').have.property('token')
                token = res.body.data.token;
                done();
            })
    });

    it('GET user profile', function(done) {
        chai.request(app)
            .get('/api/v1/user/dashboard')
            .set('token', `${token}`)
            .end(function(err, res) {
              expect(res).to.have.status(200)
              expect(res.body).to.have.property('message')
              done()  
            })
    });

    it('Create a new diary entry', function (done) {
        let payload = { title: 'Hello', description: 'This is my first entry.' }
        chai.request(app)
            .post('/api/v1/entries')
            .set('token', `${token}`)
            .send(payload)
            .end(function (err, res) {
                expect(res).to.have.status(201)
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('data')
                done()
            })
    });

    it('GET all diary entry', function (done) {
        chai.request(app)
            .get('/api/v1/entries')
            .set('token', `${token}`)
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('data')
                done();
            })
    });

    it('GET diary entry by id', function (done) {
        // const id = 'bf1e17a5-4c72-43be-aa5b-1a98151c0d09'
        chai.request(app)
            .get(`/api/v1/entries/${id}`)
            .set('token', `${token}`)
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('data')
                done()
            })
        })
        it('UPDATE diary entry by id', function (done) {
            const data = {title: 'Update entry', description: 'Hello world'}
            chai.request(app)
                .patch(`/api/v1/entries/${id}`)
                .set('token', `${token}`)
                .send(data)
                .end(function (err, res) {
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('status')
                    expect(res.body).to.have.property('data').have.property('message')
                    done();
                })
        });
        it('DELETE diary entry by id', function (done) {
            chai.request(app)
                .delete(`/api/v1/entries/${id}`)
                .set('token', `${token}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('status')
                    expect(res.body).to.have.property('data')
                    done();
                })
        })

    })

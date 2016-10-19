const app = require('./index');
const should = require('should');
const supertest = require('supertest');
const request = require('request');

describe('TESTING TIME ENTRY API', () => {

    var newEntryId = "";

    it('creating the new time entry', (done) => {

        const newEntry = {
            description: "My test entry 2",
            duration: "1:00",
            dateCreated: 1476804090205,
            entrySource: "eop",
            executor: "max-buranbaev"
        };

        supertest(app)
            .post('/api/timeEntry')
            .send(newEntry)
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.description.should.equal(newEntry.description);
                res.body.executor.should.equal(newEntry.executor);
                res.body.duration.should.equal(60);
                res.body.entrySource.should.equal(newEntry.entrySource);
                res.body.should.have.property('_id').which.is.a.String();
                newEntryId = res.body._id;
                done();
            });

    });

    it('updating the entry', (done) => {

        const updatedEntry = {
            description: "My updated entry",
            duration: "120",
            entrySource: "eop",
            executor: "max-buranbaev"
        };

        supertest(app)
            .put('/api/timeEntry/' + newEntryId)
            .send(updatedEntry)
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.description.should.equal(updatedEntry.description);
                res.body.executor.should.equal(updatedEntry.executor);
                res.body.duration.should.equal(parseInt(updatedEntry.duration));
                res.body.entrySource.should.equal(updatedEntry.entrySource);
                res.body.should.have.property('_id').which.is.a.String();
                done();
            });
    });

    it('getting entries', (done) => {

        supertest(app)
            .get('/api/timeEntry/?user=max-buranbaev')
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.length.should.be.above(1);
                done();
            });
    });

    it('deleting the entry', (done) => {

        supertest(app)
            .delete('/api/timeEntry/' + newEntryId)
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(200);
                res.text.should.equal(newEntryId);
                done();
            });
    });
});

describe('TESTING USERS API', () => {

    var newUser = {};

    request
        .get("https://beta.randomapi.com/api/963d88fa5c96e2c6a620e55c9a7d6e26")
        .on('response', (response) => {
            newUser = response.results[0];
        })
        .on('error', (error) => console.log(err));

    it('creating the new user', (done) => {

        supertest(app)
            .post('/api/user/add')
            .send('newUser')
            .expect(200)
            .end((err, res) => {
                console.log(res);
                res.status.should.equal(200);
                res.body.email.should.equal(newUser.email);
                res.body.login.should.equal(newUser.login);
                res.body.role.should.equal('user');
                res.body._id.should.have.property('_id').which.is.a.String();
                done();
            });
    });

    it('updating the user', (done) => {

        var updatedUser = {};
        request
            .get("https://beta.randomapi.com/api/963d88fa5c96e2c6a620e55c9a7d6e26")
            .on('response', (response) => {
                updatedUser = response.results[0];
                delete updatedUser.login;
            })
            .on('error', (error) => console.log(err));

        supertest(app)
            .put('/api/user/' + newUser.login)
            .send(updatedUser)
            .expect(200)
            .end( (err, res) => {
                res.status.should.equal(200);
                res.body.redmineApiKey.should.equal(updatedUser.redmineApiKey);
                res.body.aboutme.should.equal(updatedUser.aboutme);
                res.body.vk.should.equal(updatedUser.vk);
                res.body.birthday.should.equal(updatedUser.birthday);
                res.body.email.should.equal(updatedUser.email);
                res.body.skype.should.equal(updatedUser.skype);
                res.body.skype.phone.equal(updatedUser.phone);
                res.body.position.should.equal(updatedUser.position);
                res.body.fullname.should.equal(updatedUser.fullname);
                done();
            });
    });
});
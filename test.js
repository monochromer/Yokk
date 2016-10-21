const app = require('./index');
const should = require('should');
const supertest = require('supertest');
const request = require('request');
const async = require('async');
const fs = require('fs');

const randomUserAPI = "https://beta.randomapi.com/api/dimmc6ab?key=4LZJ-USXM-7MEN-K404";

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

    var userLogin = "";
    var photo = "";

    it('creating the new user', (done) => {
        async.waterfall(
            [
                (callback) => {
                    request(randomUserAPI, (error, response, body) => {
                        if(error) console.log(error);
                        var newUser = JSON.parse(body).results[0];
                        userLogin = newUser.login;
                        photo = newUser.photo;
                        callback(null, newUser);
                    });
                },
                (newUser) => {
                    supertest(app)
                        .post('/api/user/')
                        .send(newUser)
                        .expect(200)
                        .end((err, res) => {
                            res.status.should.equal(200);
                            res.body.email.should.equal(newUser.email);
                            res.body.login.should.equal(newUser.login);
                            res.body.role.should.equal('user');
                            res.body.should.have.property('_id').which.is.a.String();
                            done();
                        });

                }
            ]
        );
    });

    // it('uploading user photo', (done) => {
    //     fs.mkdir('uploads/users/' + userLogin, function(e){
    //         if(!e || (e && e.code === 'EEXIST')){
    //             var filepath = 'uploads/users/' + userLogin + '/1.jpg';
    //             request(photo).pipe(fs.createWriteStream(filepath));
    //             supertest(app)
    //                 .post('/api/user/' + userLogin + '/upload_profile_picture')
    //                 .attach('image', filepath)
    //                 .end((err, res) => {
    //                     res.status.should.equal(200);
    //                     res.body.should.have.property('profileImg').which.is.a.Object();
    //                     done();
    //                 });
    //         }
    //     });
    //
    //
    //
    // });

    it('updating the user', (done) => {
        async.waterfall(
            [
                (callback) => {
                    request(randomUserAPI, (error, response, body) => {
                        var updatedUser = JSON.parse(body).results[0];
                        delete updatedUser.login;
                        delete updatedUser.password;
                        callback(null, updatedUser);
                    });
                },
                (updatedUser) => {
                    supertest(app)
                        .put('/api/user/' + userLogin)
                        .send(updatedUser)
                        .expect(200)
                        .end((err, res) => {
                            res.status.should.equal(200);
                            res.body.redmineApiKey.should.equal(updatedUser.redmineApiKey);
                            res.body.aboutme.should.equal(updatedUser.aboutme);
                            res.body.vk.should.equal(updatedUser.vk);
                            res.body.birthday.should.equal(updatedUser.birthday);
                            res.body.email.should.equal(updatedUser.email);
                            res.body.skype.should.equal(updatedUser.skype);
                            res.body.phone.should.equal(updatedUser.phone);
                            res.body.position.should.equal(updatedUser.position);
                            res.body.fullname.should.equal(updatedUser.fullname);
                            done();
                        });
                }
            ]
        );
    });

    it('deleting the user', (done) => {
        supertest(app)
            .delete('/api/user/' + userLogin)
            .expect(200)
            .end( (err, res) => {
                res.status.should.equal(200);
                res.text.should.equal(userLogin);
                done();
            });

    });
});

describe('TESTING SYNC SERVICES', () => {
    it('syncing redmine for max-buranbaev', (done) => {
        supertest(app)
            .get('/api/sync/redmine?login=max-buranbaev')
            .expect(200)
            .end((err, res) => {
                res.body.length.should.be.above(1);
                done();
            });
    });
});
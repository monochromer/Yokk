const app = require('./index');
const should = require('should');
const supertest = require('supertest');
const request = require('request');
const async = require('async');
const fs = require('fs');
const moment = require('moment');

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

describe('TESTING TEAMS API', () => {

    let rightConfirmationCode;

    it('CREATING new team with given email olegzhermal@gmail.com should return JSON with teamLeadEmail === "olegzhermal@gmail.com"', (done) => {
        const email = 'olegzhermal@gmail.com';

        supertest(app)
            .post(`/api/teams/`)
            .send({email: email, step: "0"})
            .expect(200)
            .end((err, res) => {
                rightConfirmationCode = res.body.confirmationCode;
                res.status.should.equal(200);
                res.body.teamLeadEmail.should.equal(email);
                moment(res.body.created).toDate().should.be.Date();
                done();
            });
    });

    it('CREATING new team with email that is already in the system olegzhermal@gmail.com should return STATUS 500', (done) => {
        const email = 'olegzhermal@gmail.com';

        supertest(app)
            .post(`/api/teams/`)
            .send({email: email, step: "0"})
            .expect(500)
            .end((err, res) => {
                res.status.should.equal(500);
                done();
            });
    });

    it('CREATING new not specifying email should return STATUS 500', (done) => {
        supertest(app)
            .post(`/api/teams/`)
            .send({step: "0"})
            .expect(500)
            .end((err, res) => {
                res.status.should.equal(500);
                done();
            });
    });

    it('CHECKING WRONG confirmationCode for olegzhermal@gmail.com should return STATUS 500', (done) => {
        const email = 'olegzhermal@gmail.com';
        const confirmationCode = 'some wrong code'

        supertest(app)
            .post(`/api/teams/`)
            .send({step: "1", code: confirmationCode, email: email})
            .expect(500)
            .end((err, res) => {
                res.status.should.equal(500);
                res.body.should.equal(false);
                done();
            });
    });

    it('SAVING teamLeadLogin team olegzhermal@gmail.com when email is not confirmed should return STATUS 500', (done) => {
        const login = 'olegzhermal';
        const email = 'olegzhermal@gmail.com';

        supertest(app)
            .post(`/api/teams/`)
            .send({step: "2", login: login, email: email})
            .expect(500)
            .end((err, res) => {
                res.status.should.equal(500);
                done();
            });
    });

    it('CHECKING RIGHT confirmationCode for olegzhermal@gmail.com should return JSON with confirmed field === true', (done) => {
        const email = 'olegzhermal@gmail.com';
        const confirmationCode = rightConfirmationCode;

        supertest(app)
            .post(`/api/teams/`)
            .send({step: "1", code: confirmationCode, email: email})
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.confirmed.should.equal(true);
                done();
            });
    });

    it('SAVING teamLeadLogin for the team olegzhermal@gmail.com without specifying login should return STATUS 500', (done) => {
        const email = 'olegzhermal@gmail.com';

        supertest(app)
            .post(`/api/teams/`)
            .send({step: "2", email: email})
            .expect(500)
            .end((err, res) => {
                res.status.should.equal(500);
                done();
            });
    });

    it('SAVING teamLeadLogin for the team olegzhermal@gmail.com without specifying teamLead eamil should return STATUS 500', (done) => {
        const login = 'olegzhermal';

        supertest(app)
            .post(`/api/teams/`)
            .send({step: "2", login: login})
            .expect(500)
            .end((err, res) => {
                res.status.should.equal(500);
                done();
            });
    });

    it('SAVING teamLeadLogin (olegzhermal) for the team olegzhermal@gmail.com should return JSON with teamLead === "olegzhermal"', (done) => {
        const login = 'olegzhermal';
        const email = 'olegzhermal@gmail.com';

        supertest(app)
            .post(`/api/teams/`)
            .send({step: "2", login: login, email: email})
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.confirmed.should.equal(true);
                res.body.teamLead.should.equal(login);
                done();
            });
    });

    it('SAVING team name as OZ should return team JSON with team.name === OZ', (done) => {
        const email = 'olegzhermal@gmail.com';
        const teamName = 'OZ';

        supertest(app)
            .post(`/api/teams/`)
            .send({step: "4", name: teamName, email: email})
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.confirmed.should.equal(true);
                res.body.name.should.equal(teamName);
                done();
            });
    });

    it('READING OZ team should return JSON with teamName === "OZ"', (done) => {
        const teamName = 'OZ';

        supertest(app)
            .get(`/api/teams/${teamName}`)
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.name.should.be.equal(teamName);
                done();
            });
    });

    it('READING all the teams should return and array of objects with length > 0', (done) => {
        supertest(app)
            .get(`/api/teams`)
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.length.should.be.above(0);
                done();
            });
    });

    it('READING non-existent team should return STATUS 500', (done) => {
        const teamName = 'non-existent';
        supertest(app)
            .get(`/api/teams/${teamName}`)
            .expect(500)
            .end((err, res) => {
                res.status.should.be.equal(500);
                done();
            });
    });

    it('UPDATING OZ team (new name: "OZnew", new teamLogoURL: "/some/url.png") should return JSON correspondent new fields', (done) => {
        const teamName = 'OZ';
        const requestBody = {
            name: "OZnew",
            teamLogoURL: "/some/url.png"
        }

        supertest(app)
            .put(`/api/teams/${teamName}`)
            .send(requestBody)
            .expect(200)
            .end((err, res) => {
                res.status.should.be.equal(200);
                res.body.name.should.be.equal(requestBody.name);
                res.body.teamLogoURL.should.be.equal(requestBody.teamLogoURL);
                done();
            });
    });

    it('UPDATING non-existent team should return STATUS 500', (done) => {
        const teamName = 'non-existent';

        supertest(app)
            .put(`/api/teams/${teamName}`)
            .expect(500)
            .end((err, res) => {
                res.status.should.be.equal(500);
                done();
            });
    });

    it('UPDATING team not specifying team\'s name should return STATUS 500', (done) => {
        supertest(app)
            .put(`/api/teams/`)
            .expect(500)
            .end((err, res) => {
                res.status.should.be.equal(500);
                done();
            });
    });

    it('DELETING OZnew team should return STATUS 200 and JSON with field: ok === 1, n === 1', (done) => {
        supertest(app)
            .delete(`/api/teams/OZnew`)
            .expect(200)
            .end((err, res) => {
                res.status.should.be.equal(200);
                res.body.ok.should.be.equal(1);
                res.body.n.should.be.equal(1);
                done();
            });
    });

    it('DELETING team not specifying team\'s name should return STATUS 500', (done) => {
        supertest(app)
            .delete(`/api/teams/`)
            .expect(500)
            .end((err, res) => {
                res.status.should.be.equal(500);
                done();
            });
    });

    it('DELETING non-existent team should return STATUS 200 and JSON with field: ok === 1, n === 0', (done) => {
        const teamName = 'non-existent';
        supertest(app)
            .delete(`/api/teams/${teamName}`)
            .expect(500)
            .end((err, res) => {
                res.status.should.be.equal(200);
                res.body.ok.should.be.equal(1);
                res.body.n.should.be.equal(0);
                done();
            });
    });
});

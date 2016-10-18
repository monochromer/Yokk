const app = require('./index');
const should = require('should');
const supertest = require('supertest');

describe('TESTING TIME ENTRY API', () => {

    var newEntryId = "";

    it('create new time entry', (done) => {

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

    it('update entry', (done) => {

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

    it('delete entry', (done) => {

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
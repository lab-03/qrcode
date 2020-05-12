const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
import crypto from "crypto";
const assert = require("assert");
chai.use(chaiHttp);
chai.should();

let hash = crypto.randomBytes(20).toString("hex"),
  longitude = "10.807222",
  latitude = "-90.985722";

describe("GET /api/qrcodes", () => {
  let tempHash = crypto.randomBytes(20).toString("hex");
  before(function(done) {
    let data = {
      hash: tempHash,
      longitude,
      latitude
    };
    chai
      .request(server)
      .post("/api/qrcodes/create")
      .send(data)
      .end((err, res) => {
        done();
      });
  });
  it("should get all QrCodes", done => {
    chai
      .request(server)
      .get("/api/qrcodes")
      .end((err, res) => {
        res.should.have.status(200);
        if (err) done(err);
        else done();
      });
  });
});
describe("POST /api/qrcodes/create", () => {
  it("should create a qr", done => {
    let data = {
      hash,
      longitude,
      latitude
    };
    chai
      .request(server)
      .post("/api/qrcodes/create")
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.message, "QrCode created");
        if (err) done(err);
        else done();
      });
  }),
    it("should fail to save the QrCode in the database because the same hash exists", done => {
      let data = {
        hash,
        longitude,
        latitude
      };
      chai
        .request(server)
        .post("/api/qrcodes/create")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(res.body.message.name, "SequelizeUniqueConstraintError");
          if (err) done(err);
          else done();
        });
    }),
    it("should fail to save the QrCode in the database because the hash equal null", done => {
      let data = {
        longitude,
        latitude
      };
      chai
        .request(server)
        .post("/api/qrcodes/create")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(res.body.message.name, "SequelizeValidationError");
          if (err) done(err);
          else done();
        });
    }),
    it("should fail to save the QrCode in the database because the latitude or longitude or both equal null", done => {
      let data = {
        hash,
        latitude
      };
      chai
        .request(server)
        .post("/api/qrcodes/create")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(res.body.message.name, "SequelizeValidationError");
          if (err) done(err);
          else done();
        });
    });
});

describe("POST /api/qrcodes/end", () => {
  let tempHash = crypto.randomBytes(20).toString("hex");
  before(function(done) {
    let data = {
      hash: tempHash,
      longitude,
      latitude
    };
    chai
      .request(server)
      .post("/api/qrcodes/create")
      .send(data)
      .end((err, res) => {
        done();
      });
  });
  it("should successfully invalidate a qrCode", done => {
    let data = {
      hash: tempHash
    };
    chai
      .request(server)
      .post("/api/qrcodes/end")
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.message, "QrCode is no longer valid");
        if (err) done(err);
        else done();
      });
  }),
    it("should fail at invalidating the qrCode because it doesn't exist", done => {
      let data = {
        hash: crypto.randomBytes(20).toString("hex")
      };
      chai
        .request(server)
        .post("/api/qrcodes/end")
        .send(data)
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(res.body.message, "QrCode doesn't exist");
          if (err) done(err);
          else done();
        });
    });
});
describe("POST /api/qrcodes/attend", () => {
  it("should attend a student", done => {
    let data = {
      hash,
      longitude,
      latitude
    };
    chai
      .request(server)
      .post("/api/qrcodes/attend")
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.message, "Attendance request has been verified");
        if (err) done(err);
        else done();
      });
  });
});

describe("POST /api/qrcodes/attend", () => {
  it("should NOT attend a student because the QrCode doesn't exist", done => {
    let data = {
      hash: " ",
      longitude,
      latitude
    };
    chai
      .request(server)
      .post("/api/qrcodes/attend")
      .send(data)
      .end((err, res) => {
        res.should.have.status(404);
        assert.equal(res.body.message, "No qrCode found");
        if (err) done(err);
        else done();
      });
  });
});

describe("POST /api/qrcodes/attend", () => {
  it("should NOT attend a student because the location is too far", done => {
    let data = {
      hash,
      longitude: "11.807222",
      latitude
    };
    chai
      .request(server)
      .post("/api/qrcodes/attend")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal(res.body.message, "Your location is too far");
        if (err) done(err);
        else done();
      });
  });
});
describe("POST /api/qrcodes/attend", () => {
  it("should NOT attend a student because the location is too far", done => {
    let data = {
      hash,
      longitude,
      latitude: "-91.985722"
    };
    chai
      .request(server)
      .post("/api/qrcodes/attend")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal(res.body.message, "Your location is too far");
        if (err) done(err);
        else done();
      });
  });
});

describe("POST /api/qrcodes/attend", () => {
  before(function(done) {
    let data = {
      hash
    };
    chai
      .request(server)
      .post("/api/qrcodes/end")
      .send(data)
      .end((err, res) => {
        done();
      });
  });
  it("should not attend a student because the qrCode is no longer valid", done => {
    let data = {
      hash,
      longitude,
      latitude
    };

    chai
      .request(server)
      .post("/api/qrcodes/attend")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal(res.body.message, "This QrCode is no longer valid");
        if (err) done(err);
        else done();
      });
  });
});

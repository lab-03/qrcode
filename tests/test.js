const server = require("../server");
const chai =  require('chai') ;
const chaiHttp = require("chai-http");
import crypto from "crypto";
const assert = require('assert');
chai.use(chaiHttp);
chai.should();


let hash = crypto.randomBytes(20).toString("hex"),
    longitude = "10.807222",
    latitude = "-90.985722",
    date = new Date();
    

  describe("GET /api/qrcodes", () => {
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
  describe("POST /api/qrcodes/create",()=>{
    it("should create a qr", done => {
      let data = {
        hash,
        longitude,
        latitude,
        date
      };
      chai
        .request(server)
        .post("/api/qrcodes/create")
        .send(data)
        .end((err,res)=>{
          res.should.have.status(200);
          assert.equal(res.body.message, "QrCode created");
          if (err) done(err);
          else done();
        })
    })
  });

  describe("POST /api/qrcodes/create", () => {
    it("should fail to save the QrCode in the database because the same hash exists", done => {
      let data = {
        hash,
        longitude,
        latitude,
        date
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
    });
  });

  describe("POST /api/qrcodes/create", () => {
    it("should fail to save the QrCode in the database because the hash equal null", done => {
      let data = {
        longitude,
        latitude,
        date
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

  describe("POST /api/qrcodes/create", () => {
    it("should fail to save the QrCode in the database because the latitude or longitude or both equal null", done => {
      let data = {
        hash,
        latitude,
        date
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

  describe("POST /api/qrcodes/attend", () => {
    it("should attend a student", done => {
      let data = {
        hash,
        longitude,
        latitude,
        date
      };
      chai
        .request(server)
        .post("/api/qrcodes/attend")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, "Attendance has been recorded");
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
        latitude,
        date
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
        latitude,
        date
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
        latitude: "-91.985722",
        date
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
    it("should not attend a student because its time out", done => {
       date = new Date(date.getTime() + 11*60000)
     
      let data = {
        hash,
        longitude,
        latitude,
        date
      };
      
      chai
        .request(server)
        .post("/api/qrcodes/attend")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(res.body.message, "This qrCode is no longer valid");
          if (err) done(err);
          else done();
        });
    });
  });

  //   before(() => {
  //     let qrCode = {
  //       hash: "ASDfgwr23rfgefsd@#@!@#dfs",
  //       longitude: "10.807222",
  //       latitude: "-90.985722"
  //     };
  //     chai
  //       .request(server)
  //       .post("/api/qrcodes/create")
  //       .send(qrCode)
  //       .end((err, res) => {
  //         console.log(res.message);
  //       });
  //   });
  //   describe("GET /api/qrcodes/attend", () => {
  //     it("should attend a student", done => {
  //       let data = {
  //         hash: "ASDfgwr23rfgefsd@#@!@#dfs",
  //         longitude: "10.807272",
  //         latitude: "-90.985522",
  //         date: "2020-02-15T21:24:22.360Z"
  //       };
  //       chai
  //         .request(server)
  //         .get("/api/qrcodes/attend")
  //         .send(data)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           console.log(res.message);
  //           done();
  //         });
  //     });
  //   });


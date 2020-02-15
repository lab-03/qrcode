const server = require("../server");
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
chai.should();

describe("QrCodes", () => {
  describe("GET /api/qrcodes", () => {
    it("should get all QrCodes", done => {
      chai
        .request(server)
        .get("/api/qrcodes")
        .end((err, res) => {
          res.should.have.status(200);
          done();
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
  //   describe("GET /api/attend", () => {
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
});

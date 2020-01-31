const QRCode = require("qrcode");
const request = require("request");

class Controller {
  async generateQrCode(data) {
    console.log(data);
    return await QRCode.toDataURL(JSON.stringify(data), {
      toSJISFunc: QRCode.toSJIS
    })
      .then(url => {
        return url;
      })
      .catch(err => {
        console.error(err);
      });
  }

  async createQrCode(req, res) {
    let key = Math.random();
    let url = "https://www.example.com";
    let { longitude, latitude, instructorId, courseId } = req.body;
    let code = await this.generateQrCode({
      // longitude: longitude,
      // latitude: latitude,
      // instructorId: instructorId,
      // courseId: courseId,
      url: url,
      key: key
    });
    res.status(200).send({
      code: code
    });
  }
}
const mainController = new Controller();
export default mainController;

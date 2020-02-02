const QRCode = require("qrcode");
import Util from "../utils/Utils";

const util = new Util();

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
        throw err;
      });
  }

  async createQrCode(req, res) {
    let { longitude, latitude, instructorId, courseId } = req.body;
    // let max = Math.ceil(Math.random() * (1000 - 1 + 1) + 1);
    // let min = Math.ceil(Math.random() * (max + 1)); // generate a random number between max (inclusive) and 0 (inclusive)
    // console.log(max, min);
    // let salt = Math.abs(Math.floor(Math.random() * (max - min + 1) + min));
    // console.log(this.pairingFunction(instructorId, courseId));
    try {
      let code = await this.generateQrCode({
        longitude: longitude,
        latitude: latitude,
        instructorId: instructorId,
        courseId: courseId
        // salt: salt
      });
      util.setSuccess(200, "qrcode created", code);
      return util.send(res);
    } catch (err) {
      console.error(err);
      util.setError(500, err);
      return util.send(res);
    }
  }
}
const mainController = new Controller();
export default mainController;

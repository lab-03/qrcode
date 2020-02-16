const QRCode = require("qrcode");
import QrCodeServices from "../services/QrCodeServices";
import Util from "../utils/Utils";

const util = new Util();

class QrCodeController {
  static async generateQrCode(data) {
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
  static async createQrCode(req, res) {
    const { hash } = req.body;
    try {
      let code = await this.generateQrCode({
        hash
      });
      await QrCodeServices.addQrCode(req.body);
      util.setSuccess(200, "qrCode created", code);
      return util.send(res);
    } catch (err) {
      console.error(err);
      util.setError(400, err);
      return util.send(res);
    }
  }

  static async getAllQrCodes(req, res) {
    try {
      const data = await QrCodeServices.getAllQrCodes();
      if (data.length > 0) {
        util.setSuccess(200, "QrCode information retrieved", data);
      } else {
        util.setSuccess(404, "No QrCode found");
      }
      return util.send(res);
    } catch (err) {
      console.error(err);
      util.setError(500, err);
      return util.send(res);
    }
  }
  static async attend(req, res) {
    const { hash, longitude, latitude, date } = req.body;
    try {
      const qrCode = await QrCodeServices.getQrCode(hash);
      if (!qrCode) {
        util.setError(400, "No qrCode found");
        return util.send(res);
      }

      if (!QrCodeServices.validDate(qrCode.dataValues, new Date(date))) {
        util.setError(400, "This qrCode is no longer valid");
        return util.send(res);
      }

      if (
        QrCodeServices.validLocation(qrCode.dataValues, longitude, latitude)
      ) {
        util.setSuccess(200, "Attendance has been recorded");
        return util.send(res);
      } else {
        util.setError(400, "Your location is too far");
        return util.send(res);
      }
    } catch (err) {
      console.error(err);
      util.setError(500, err);
      return util.send(res);
    }
  }
}
export default QrCodeController;

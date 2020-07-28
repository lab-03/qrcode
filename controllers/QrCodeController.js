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
      util.setSuccess(200, "QrCode created", code);
      return util.send(res);
    } catch (err) {
      console.error(err);
      util.setError(400, err);
      return util.send(res);
    }
  }

  static async invalidate(req, res) {
    const { hash } = req.body;
    try {
      const result = await QrCodeServices.invalidate(hash);
      if (result[0]) util.setSuccess(200, "QrCode has been invalidated");
      else util.setError(404, "No qrCode found");

      return util.send(res);
    } catch (err) {
      console.error(err);
      util.setError(500, err);
      return util.send(res);
    }
  }

  static async getQrCode(req, res) {
    const { hash } = req.body;

    try {
      const qrCode = await QrCodeServices.getQrCode(hash);
      if (!qrCode) {
        util.setError(404, "No qrCode found");
      } else {
        util.setSuccess(200, "QrCode retrieved", qrCode);
      }
      return util.send(res);
    } catch (err) {
      console.error(err);
      util.setError(500, err);
      return util.send(res);
    }
  }

  static async getAllQrCodes(req, res) {
    try {
      const data = await QrCodeServices.getAllQrCodes();
      if (data.length > 0) {
        util.setSuccess(200, "QrCodes retrieved", data);
      } else {
        util.setError(404, "No QrCodes were found");
      }
      return util.send(res);
    } catch (err) {
      console.error(err);
      util.setError(500, err);
      return util.send(res);
    }
  }
  static async deleteQrCode(req, res) {
    const { hash } = req.body;
    try {
      const result = await QrCodeServices.deleteQrCode(hash);
      if (!result) {
        util.setError(404, "No qrCode found");
      } else {
        util.setSuccess(200, "QrCode deleted");
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
        util.setError(404, "No qrCode found");
      } else {
        if (qrCode.dataValues.valid) {
          if (
            QrCodeServices.validLocation(qrCode.dataValues, longitude, latitude)
          ) {
            util.setSuccess(200, "Attendance request has been verified");
          } else {
            util.setError(400, "Your location is too far");
          }
        } else {
          util.setError(400, "This QrCode is no longer valid");
        }
      }
      return util.send(res);
    } catch (err) {
      console.error(err);
      util.setError(500, err);
      return util.send(res);
    }
  }
}
export default QrCodeController;

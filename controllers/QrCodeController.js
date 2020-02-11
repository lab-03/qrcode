const geolib = require("geolib");
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
    let { instructorId, courseId } = req.body;
    try {
      const { dataValues } = await QrCodeServices.addQrCode(req.body);
      const timeStamp = dataValues.createdAt;
      let code = await this.generateQrCode({
        instructorId,
        courseId,
        timeStamp
      });
      util.setSuccess(200, "qrCode created", code);
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
        util.setSuccess(200, "QrCode information retrieved", data);
      } else {
        util.setSuccess(200, "No information found");
      }
      return util.send(res);
    } catch (err) {
      console.error(err);
      util.setError(500, err);
      return util.send(res);
    }
  }
  static async attend(req, res) {
    const {
      longitude,
      latitude,
      studentId,
      courseGroupId,
      courseId,
      date
    } = req.body;
    try {
      const qrCode = await QrCodeServices.getQrCode(req.body);
      if (!qrCode) {
        util.setError(400, "No qrCode found");
        return util.send(res);
      }

      if (!this.validDate(qrCode.dataValues, new Date(date))) {
        util.setError(400, "qrCode is no longer valid");
        return util.send(res);
      }

      if (this.validLocation(qrCode.dataValues, longitude, latitude)) {
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
  static validLocation(dataValues, longitude, latitude) {
    const src = {
      latitude: dataValues.location.coordinates[1],
      longitude: dataValues.location.coordinates[0]
    };
    return geolib.isPointWithinRadius({ latitude, longitude }, src, 200);
  }
  static validDate(dataValues, reqDate) {
    const TIMEOUT = 600000; // 10 minutes in milliseconds

    let timeDiff = Math.abs(dataValues.createdAt.getTime() - reqDate.getTime());

    if (timeDiff > TIMEOUT) {
      return 0;
    }
    return 1;
  }
}
export default QrCodeController;

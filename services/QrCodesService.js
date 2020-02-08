import db from "../database/models";

class QrCodesService {
  static async getAllQrCodes(req, res) {
    try {
      return await db.qrcodes.findAll();
    } catch (err) {
      throw err;
    }
  }
}

export default QrCodesService;

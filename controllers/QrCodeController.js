import QrCodesService from "../services/QrCodesService";
import Util from "../utils/Utils";

const util = new Util();

class QrCodeController {
  static async getAllQrCodes(req, res) {
    try {
      const data = await QrCodesService.getAllQrCodes();
      if (data.length > 0) {
        util.setSuccess(200, "qrcode information retrieved", data);
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
}

export default QrCodeController;

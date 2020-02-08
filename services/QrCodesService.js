import db from "../database/models";
const { qrcodes } = db;

class QrCodesService {
  static async getAllQrCodes() {
    try {
      return await qrcodes.findAll();
    } catch (err) {
      throw err;
    }
  }
  static async addQrCode(data) {
    const { longitude, latitude, instructorId, courseId } = data;
    const location = {
      type: "Point",
      coordinates: [longitude, latitude],
      crs: { type: "name", properties: { name: "EPSG:4326" } }
    };
    try {
      return await qrcodes.create({
        location,
        longitude,
        latitude,
        instructorId,
        courseId
      });
    } catch (err) {
      throw err;
    }
  }
}

export default QrCodesService;

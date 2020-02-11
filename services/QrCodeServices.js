import db from "../database/models";
const { QrCodes } = db;

class QrCodesService {
  static async getAllQrCodes() {
    try {
      return await QrCodes.findAll();
    } catch (err) {
      throw err;
    }
  }
  static async getQrCode(data) {
    const { instructorId, courseId, timeStamp } = data;
    try {
      const qrCode = await QrCodes.findOne({
        where: {
          instructorId,
          courseId,
          createdAt: timeStamp
        }
      });
      return qrCode;
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
      return await QrCodes.create({
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

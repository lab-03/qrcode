const geolib = require("geolib");
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
  static async getQrCode(hash) {
    try {
      const qrCode = await QrCodes.findOne({
        where: {
          hash
        }
      });
      return qrCode;
    } catch (err) {
      throw err;
    }
  }
  static async addQrCode(data) {
    const { longitude, latitude, hash } = data;
    let location = {
      type: "Point",
      coordinates: [longitude, latitude],
      crs: { type: "name", properties: { name: "EPSG:4326" } }
    };

    if (!longitude || !latitude){
      location = null;
    }
    
    try {
      return await QrCodes.create({
        location,
        hash
      });
    } catch (err) {
      throw err;
    }
  }
  static validLocation(dataValues, longitude, latitude) {
    const src = {
      latitude: dataValues.location.coordinates[1],
      longitude: dataValues.location.coordinates[0]
    };
    return geolib.isPointWithinRadius({ latitude, longitude }, src, 200); // check if within 200 meters
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

export default QrCodesService;

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
  static async deleteQrCode(hash) {
    try {
      const res = await QrCodes.destroy({
        where: {
          hash
        }
      });
      return res;
    } catch (err) {
      throw err;
    }
  }
  static async addQrCode(data) {
    const { longitude, latitude, hash, applyChecks } = data;
    let location = null;
    if (longitude && latitude) {
      location = {
        type: "Point",
        coordinates: [longitude, latitude],
        crs: { type: "name", properties: { name: "EPSG:4326" } }
      };
    }

    try {
      return await QrCodes.create({
        location,
        hash,
        applyChecks
      });
    } catch (err) {
      throw err;
    }
  }

  static async invalidate(hash) {
    try {
      return QrCodes.update(
        {
          valid: "false"
        },
        {
          where: {
            hash
          }
        }
      );
    } catch (err) {
      throw err;
    }
  }

  static validLocation({ location }, longitude, latitude) {
    const src = {
      latitude: location.coordinates[1],
      longitude: location.coordinates[0]
    };
    return geolib.isPointWithinRadius({ latitude, longitude }, src, 30); // check if within 30 meters
  }
}

export default QrCodesService;

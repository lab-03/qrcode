import db from "../database/models";

class LectureInfoService {
  static async getAllLectureInfos(req, res) {
    try {
      return await db.lecture_infos.findAll();
    } catch (err) {
      throw err;
    }
  }
}

export default LectureInfoService;
